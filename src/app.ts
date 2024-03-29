import express from 'express';
import { json } from 'body-parser';
import { carRouter } from './routes/carRouter';
import { userRouter } from './routes/userRouter';
import { errorMiddleware } from './middlewares/error';
import { authenticateRouter } from './routes/authenticateRouter';
import { reserveRouter } from './routes/reserveRouter';
import swaggerSetup from './swagger';

export const app = express();

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

swaggerSetup(app);

app.use('/api/v1/car', carRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/authenticate', authenticateRouter);
app.use('/api/v1/reserve', reserveRouter);

app.use(json());

app.use(errorMiddleware);
