import { Request, Response, NextFunction } from 'express';
import UserService from '../services/userService';
import { UserDTO } from '../schemas/user/dto/userDTO';

class UserController {
  public async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = await UserService.findAll();

      res.status(200).json({
        status: 'success',
        results: users.length,
        data: {
          data: users,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  public async findById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      const user = await UserService.findById(id);

      res.status(200).json({
        status: 'success',
        data: {
          data: user,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const user: UserDTO = req.body;
      const createdUser = await UserService.create(user);

      res.status(201).json({
        status: 'success',
        data: {
          data: createdUser,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { id } = req.params;
      await UserService.delete(id);

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
      const user: UserDTO = req.body;

      const updatedUser = await UserService.update(id, user);

      res.status(200).json({ updatedUser });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
