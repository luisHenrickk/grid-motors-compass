import carRepository from '../repositories/carRepository';
import { CarDTO } from '../schemas/dto/carDTO';
import { ICar } from '../schemas/interfaces/ICar';

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

  /*public async updateAcessories(
    carId: string,
    acessoryId: string,
    updateAccessoryDto: updateAccessoryDTO,
  ): Promise<ICar | null> {
    const car = await carRepository.findById(carId);

    if (!car) {
      throw new Error('Car not found');
    }

    const accessoryIndex = car.accesories.findIndex((c: IAccessory) => c.id);
    return carRepository.update(id, car);
  }*/
}

export default new CarService();
