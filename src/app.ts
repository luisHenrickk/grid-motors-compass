import express from 'express';
import { json } from 'body-parser';
import { carRouter } from './routes/carRouter';
import { userRouter } from './routes/userRouter';
import { errorMiddleware } from './middlewares/error';
import { authenticateRouter } from './routes/authenticateRouter';

export const app = express();

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use('/api/v1/car', carRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/authenticate', authenticateRouter);

app.use(json());

app.use(errorMiddleware);
