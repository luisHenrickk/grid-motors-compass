import reserveRepository from '../repositories/reserveRepository';
import { ReserveDTO } from '../schemas/reserve/dto/reserveDTO';
import { IReserve } from '../schemas/reserve/IReserve';
import { BadRequestError, NotFoundError } from '../utils/api-errors';
import Reserve from '../schemas/reserve/reserveSchema';
import moment from 'moment';
import userRepository from '../repositories/userRepository';
import carRepository from '../repositories/carRepository';
import { isObjectIdOrHexString } from 'mongoose';

class ReserveService {
  public async findAll(query: any): Promise<IReserve[]> {
    const { page = 1, limit = 100 } = query;
    const queryObj = { ...query };

    const excludedFields = ['select', 'sort', 'page', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    return reserveRepository.findAll(queryStr, page, limit);
  }

  public async findById(id: string): Promise<IReserve | null> {
    if (!isObjectIdOrHexString(id)) {
      throw new BadRequestError('Invalid id provided');
    }

    const car = await reserveRepository.findById(id);

    if (!car) {
      throw new NotFoundError('Reserve not found');
    }

    return car;
  }

  public async create(reserveDto: ReserveDTO): Promise<IReserve> {
    reserveDto.start_date = new Date(reserveDto.start_date.toString().replaceAll('/', '-'));
    reserveDto.end_date = new Date(reserveDto.end_date.toString().replaceAll('/', '-'));

    if (!isObjectIdOrHexString(reserveDto.id_car)) {
      throw new BadRequestError('Invalid car id provided');
    }

    if (await this.checkReserve(reserveDto.id_user, reserveDto.start_date, reserveDto.end_date)) {
      throw new BadRequestError('Conflict of dates with another reservation');
    }

    const user = await userRepository.findById(reserveDto.id_user);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    if (user.qualified === 'não') {
      throw new BadRequestError('User does not have a license to drive');
    }

    const car = await carRepository.findById(reserveDto.id_car);

    if (!car) {
      throw new NotFoundError('Car not found');
    }

    const days = moment(reserveDto.end_date).diff(moment(reserveDto.start_date), 'days') + 1;
    const final_value = days * car.value_per_day;

    reserveDto.final_value = final_value;
    return reserveRepository.create(reserveDto);
  }

  public async delete(id: string): Promise<any> {
    if (!isObjectIdOrHexString(id)) {
      throw new BadRequestError('Invalid id provided');
    }

    const doc = await reserveRepository.delete(id);

    if (!doc) {
      throw new NotFoundError('Reserve not found');
    }
  }

  public async update(id: string, reserveDto: ReserveDTO): Promise<IReserve | null> {
    if (!isObjectIdOrHexString(id)) {
      throw new BadRequestError('Invalid id provided');
    }

    const updatedCar = await reserveRepository.update(id, reserveDto);

    if (!updatedCar) {
      throw new NotFoundError('Reserve not found');
    }

    return updatedCar;
  }

  private async checkReserve(user_id: string, start_date: Date, end_date: Date): Promise<boolean> {
    const reserves = await Reserve.find({ id_user: user_id });

    for (const res of reserves) {
      const isOverlapping =
        moment(start_date).isBetween(res.start_date, res.end_date, undefined, '[]') ||
        moment(end_date).isBetween(res.start_date, res.end_date, undefined, '[]') ||
        moment(res.start_date).isBetween(start_date, end_date, undefined, '[]') ||
        moment(res.end_date).isBetween(start_date, end_date, undefined, '[]');

      if (isOverlapping) {
        return true;
      }
    }
    return false;
  }
}

export default new ReserveService();
