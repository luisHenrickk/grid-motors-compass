import { Request, Response, NextFunction } from 'express';
import UserService from '../services/userService';
import { UserDTO } from '../schemas/user/dto/userDTO';
import moment from 'moment';

class UserController {
  public async findAll(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const users = await UserService.findAll();

      const formattedUsers = users.map((user) => ({
        ...user.toObject(),
        birth: moment(user.birth).format('DD/MM/YYYY'),
      }));

      res.status(200).json({
        status: 'success',
        results: formattedUsers.length,
        data: {
          data: formattedUsers,
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

      const formattedUser = {
        ...user?.toObject(),
        birth: moment(user?.birth).format('DD/MM/YYYY'),
      };

      res.status(200).json({
        status: 'success',
        data: {
          data: formattedUser,
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

      createdUser.password = '';

      const formattedUser = {
        ...createdUser.toObject(),
        birth: moment(user?.birth).format('DD/MM/YYYY'),
      };

      res.status(201).json({
        status: 'success',
        data: {
          data: formattedUser,
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

      const formattedUser = {
        ...updatedUser?.toObject(),
        birth: moment(user?.birth).format('DD/MM/YYYY'),
      };

      res.status(200).json({ formattedUser });
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
