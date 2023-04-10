import { Document, Types } from 'mongoose';

export interface IReserve extends Document {
  id_user?: Types.ObjectId;
  start_date: Date;
  end_date: Date;
  id_car: Types.ObjectId;
  final_value?: number;
}
