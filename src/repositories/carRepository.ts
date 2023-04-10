import { CarDTO } from '../schemas/car/dto/carDTO';
import { ICar } from '../schemas/car/ICar';
import Car from '../schemas/car/carSchema';
import { UpdateCarDTO } from '../schemas/car/dto/updateCarDTO';

class CarRepository {
  public async findAll(queryStr: string, page: number, limit: number): Promise<ICar[]> {
    const startIndex = (page - 1) * limit;
    let query = Car.find(JSON.parse(queryStr));
    query = query.select('-__v');
    query = query.skip(startIndex).limit(limit);

    return await query;
  }

  public async findById(id: string): Promise<ICar | null> {
    return await Car.findById(id);
  }

  public async create(carDto: CarDTO): Promise<ICar> {
    return await Car.create(carDto);
  }

  public async delete(id: string): Promise<any> {
    return await Car.findByIdAndDelete(id);
  }

  public async update(id: string, updateCarDto: UpdateCarDTO): Promise<ICar | null> {
    return await Car.findByIdAndUpdate(id, updateCarDto, {
      new: true,
      runValidators: true,
    });
  }
}

export default new CarRepository();
