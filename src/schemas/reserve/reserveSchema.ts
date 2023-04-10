import mongoose, { Schema } from 'mongoose';
import { IReserve } from './IReserve';

const ReserveSchema: Schema = new Schema<IReserve>({
  id_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Reserve must belong to a User!'],
  },
  start_date: {
    type: Date,
    required: [true, 'start date is required'],
  },
  end_date: {
    type: Date,
    required: [true, 'end date is required'],
  },
  id_car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: [true, 'Reserve must belong to a Car!'],
  },
  final_value: {
    type: Number,
    required: true,
  },
});

ReserveSchema.index({ id_car: 1, star_date: 1 }, { unique: true });

export default mongoose.model<IReserve>('Reserve', ReserveSchema);
