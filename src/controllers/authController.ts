import { Request, Response, NextFunction } from 'express';
import User from '../schemas/user/userSchema';
import jwt from 'jsonwebtoken';
import { BadRequestError, UnauthorizedError } from '../utils/api-errors';
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN!;

const signToken = (id: string): string => {
  const token = jwt.sign({ id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  return token;
};

interface JwtPayload {
  id: string;
  iat: number;
  exp: number;
}

interface AuthRequest extends Request {
  user?: any;
}

class AuthController {
  public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, password } = req.body;

    if (!email || !password) {
      next(new BadRequestError('Please provide email and password'));
    }

    const user = await User.findOne({ email }).select('+password');

    if (!user || !(await user.isCorrectPassword(password, user.password))) {
      next(new UnauthorizedError('Incorrect email or password'));
    }

    const token = signToken(user?._id);

    res.status(200).json({ token });
  }

  public async protect(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      let token: string | undefined;

      if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
      }

      if (!token) {
        throw new UnauthorizedError('You are not logged in! Please log in to get access.');
      }

      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

      const currentUser = await User.findById(decoded.id);

      if (!currentUser) {
        throw new UnauthorizedError('The user belonging to this token does no longer exist.');
      }

      req.user = currentUser;
      res.locals.user = currentUser;
      next();
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
