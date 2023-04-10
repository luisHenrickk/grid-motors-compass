import { Request, Response, NextFunction } from 'express';
import ReserveService from '../services/reserveService';
import { ReserveDTO } from '../schemas/reserve/dto/reserveDTO';
import { BadRequestError } from '../utils/api-errors';
import moment from 'moment';

class ReserveController {
  public async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const reserves = await ReserveService.findAll(req.query);

      const formattedReserves = reserves.map((res) => ({
        ...res.toObject(),
        start_date: moment(res.start_date).format('DD/MM/YYYY'),
        end_date: moment(res.end_date).format('DD/MM/YYYY'),
      }));

      res.status(200).json({
        status: 'success',
        results: formattedReserves.length,
        data: {
          data: formattedReserves,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  public async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const reserve = await ReserveService.findById(id);

      const formattedReserve = {
        ...reserve?.toObject(),
        start_date: moment(reserve?.start_date).format('DD/MM/YYYY'),
        end_date: moment(reserve?.end_date).format('DD/MM/YYYY'),
      };

      res.status(200).json({
        status: 'success',
        data: {
          data: formattedReserve,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const reserve: ReserveDTO = req.body;
      reserve.id_user = res.locals.user._id;
      const createdReserve = await ReserveService.create(reserve);

      const formattedReserve = {
        ...createdReserve.toObject(),
        start_date: moment(createdReserve?.start_date).format('DD/MM/YYYY'),
        end_date: moment(createdReserve?.end_date).format('DD/MM/YYYY'),
      };

      res.status(201).json({
        status: 'success',
        data: {
          data: formattedReserve,
        },
      });
    } catch (error: any) {
      if (error.code === 11000) {
        next(new BadRequestError('There is already a reservation for this car and period'));
      }
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await ReserveService.delete(id);

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
      const reserve: ReserveDTO = req.body;

      const updatedReserve = await ReserveService.update(id, reserve);

      const formattedReserve = {
        ...updatedReserve?.toObject(),
        start_date: moment(updatedReserve?.start_date).format('DD/MM/YYYY'),
        end_date: moment(updatedReserve?.end_date).format('DD/MM/YYYY'),
      };

      res.status(200).json({ formattedReserve });
    } catch (error) {
      next(error);
    }
  }
}

export default new ReserveController();
