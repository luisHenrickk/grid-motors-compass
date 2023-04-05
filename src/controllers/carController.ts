import { Request, Response, NextFunction } from 'express';
import CarService from '../services/carService';
import { CarDTO } from '../schemas/dto/carDTO';
import { UpdateAccessoryDTO } from '../schemas/dto/updateAccessoryDTO';

class CarController {
  public async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const cars = await CarService.findAll();

      res.status(200).json({
        status: 'success',
        results: cars.length,
        data: {
          data: cars,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  public async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const car = await CarService.findById(id);

      res.status(200).json({
        status: 'success',
        data: {
          data: car,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const car: CarDTO = req.body;
      const createdCar = await CarService.create(car);

      res.status(201).json({
        status: 'success',
        data: {
          data: createdCar,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await CarService.delete(id);

      res.status(204).json({
        status: 'success',
        data: null,
      });
    } catch (error) {
      next(error);
    }
  }

  public async update(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const car: CarDTO = req.body;

      const updatedCar = await CarService.update(id, car);

      res.status(200).json({ updatedCar });
    } catch (error) {
      next(error);
    }
  }

  public async updateAccessory(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { carId, accessoryId } = req.params;
      const updateAccesoryDto: UpdateAccessoryDTO = req.body;

      const updatedCar = await CarService.updateAcessories(carId, accessoryId, updateAccesoryDto);

      res.status(200).json(updatedCar);
    } catch (error) {
      next(error);
    }
  }
}

export default new CarController();
