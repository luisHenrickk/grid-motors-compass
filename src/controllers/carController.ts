import { Request, Response } from 'express';
import CarService from '../services/carService';
import { CarDTO } from '../schemas/dto/carDTO';

class CarController {
  public async findAll(req: Request, res: Response): Promise<Response> {
    try {
      const cars = await CarService.findAll();

      return res.status(200).json({
        status: 'success',
        results: cars.length,
        data: {
          data: cars,
        },
      });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  public async findById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const car = await CarService.findById(id);

      if (!car) {
        return res.status(404).json({ error: 'Car not found' });
      }

      return res.status(200).json({
        status: 'success',
        data: {
          data: car,
        },
      });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const car: CarDTO = req.body;
      const createdCar = await CarService.create(car);

      return res.status(201).json({
        status: 'success',
        data: {
          data: createdCar,
        },
      });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const doc = await CarService.delete(id);

      if (!doc) {
        return res.status(404).json({ error: 'Car not found' });
      }

      return res.status(204).json({
        status: 'success',
        data: null,
      });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const car: CarDTO = req.body;

      const updatedCar = await CarService.update(id, car);

      if (!updatedCar) {
        return res.status(404).json({ error: 'Car not found' });
      }

      return res.status(200).json({ updatedCar });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export default new CarController();
