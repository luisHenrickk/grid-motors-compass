import { UpdateAccessoryDTO } from './../schemas/dto/updateAccessoryDTO';
import carRepository from '../repositories/carRepository';
import { CarDTO } from '../schemas/dto/carDTO';
import { ICar } from '../schemas/interfaces/ICar';
import { ObjectId } from 'mongodb';

class CarService {
  public async findAll(): Promise<ICar[]> {
    return carRepository.findAll();
  }

  public async findById(id: string): Promise<ICar | null> {
    return carRepository.findById(id);
  }

  public async create(carDto: CarDTO): Promise<ICar> {
    return carRepository.create(carDto);
  }

  public async delete(id: string): Promise<any> {
    return carRepository.delete(id);
  }

  public async update(id: string, carDto: CarDTO): Promise<ICar | null> {
    return carRepository.update(id, carDto);
  }

  public async updateAcessories(
    carId: string,
    accessoryId: string,
    updateAccessoryDto: UpdateAccessoryDTO,
  ): Promise<ICar | null> {
    const car = await carRepository.findById(carId);

    if (!car) {
      throw new Error('Car not found');
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
      throw new Error('Accesory not found');
    }

    return carRepository.update(carId, car);
  }
}

export default new CarService();
