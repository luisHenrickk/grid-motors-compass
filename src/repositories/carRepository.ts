import { CarDTO } from '../schemas/dto/carDTO';
import { ICar } from '../schemas/interfaces/ICar';
import Car from '../schemas/carSchema';

class CarRepository {
  public async findAll(): Promise<ICar[]> {
    return Car.find().exec();
  }

  public async findById(id: string): Promise<ICar | null> {
    return Car.findById(id).exec();
  }

  public async create(carDto: CarDTO): Promise<ICar> {
    return Car.create(carDto);
  }

  public async delete(id: string): Promise<any> {
    return Car.findByIdAndDelete(id).exec();
  }

  public async update(id: string, carDto: CarDTO): Promise<ICar | null> {
    return Car.findByIdAndUpdate(id, carDto, {
      new: true,
      runValidators: true,
    }).exec();
  }
}

export default new CarRepository();
