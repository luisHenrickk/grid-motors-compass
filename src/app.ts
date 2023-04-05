import express from 'express';
import { json } from 'body-parser';
import { carRouter } from './routes/carRouter';
import { errorMiddleware } from './middlewares/error';

export const app = express();

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use('/api/v1/car', carRouter);

app.use(json());

app.use(errorMiddleware);
