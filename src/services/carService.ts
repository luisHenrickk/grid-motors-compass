import { UpdateAccessoryDTO } from './../schemas/dto/updateAccessoryDTO';
import carRepository from '../repositories/carRepository';
import { CarDTO } from '../schemas/dto/carDTO';
import { ICar } from '../schemas/interfaces/ICar';
import { ObjectId } from 'mongodb';
import { NotFoundError } from '../utils/api-errors';

class CarService {
  public async findAll(query: any): Promise<ICar[]> {
    const { page = 1, limit = 100 } = query;
    const queryObj = { ...query };

    const excludedFields = ['select', 'sort', 'page', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    return carRepository.findAll(queryStr, page, limit);
  }

  public async findById(id: string): Promise<ICar | null> {
    const car = await carRepository.findById(id);

    if (!car) {
      throw new NotFoundError('Car not found');
    }

    return car;
  }

  public async create(carDto: CarDTO): Promise<ICar> {
    return carRepository.create(carDto);
  }

  public async delete(id: string): Promise<any> {
    const doc = await carRepository.delete(id);

    if (!doc) {
      throw new NotFoundError('Car not found');
    }
  }

  public async update(id: string, carDto: CarDTO): Promise<ICar | null> {
    const updatedCar = await carRepository.update(id, carDto);

    if (!updatedCar) {
      throw new NotFoundError('Car not found');
    }

    return updatedCar;
  }

  public async updateAcessories(
    carId: string,
    accessoryId: string,
    updateAccessoryDto: UpdateAccessoryDTO,
  ): Promise<ICar | null> {
    const car = await carRepository.findById(carId);

    if (!car) {
      throw new NotFoundError('Car not found');
    }

    const accessoryIndex = car.accessories.findIndex((a) => a._id.toString() === accessoryId);

    if (accessoryIndex !== -1) {
      if (car.accessories[accessoryIndex].description === updateAccessoryDto.description) {
        car.accessories.splice(accessoryIndex, 1);
      } else {
        car.accessories[accessoryIndex]._id = new ObjectId();
        car.accessories[accessoryIndex].description = updateAccessoryDto.description;
      }
    } else {
      throw new NotFoundError('Accessory not found');
    }

    return carRepository.update(carId, car);
  }
}

export default new CarService();
