import mongoose, { Schema } from 'mongoose';
import { ICar } from './interfaces/ICar';

const CarSchema: Schema = new Schema<ICar>({
  model: {
    type: String,
    required: [true, 'model is required'],
  },
  color: {
    type: String,
    required: [true, 'color is required'],
  },
  year: {
    type: String,
    required: [true, 'year is required'],
  },
  value_per_day: {
    type: Number,
    required: [true, 'value per day is required'],
  },
  accessories: [
    {
      description: {
        type: String,
        required: [true, 'description is required'],
      },
    },
  ],
  number_of_passengers: {
    type: Number,
    required: [true, 'number of passengers is required'],
  },
});

export default mongoose.model<ICar>('Car', CarSchema);
