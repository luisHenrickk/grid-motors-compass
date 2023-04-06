import { Document } from 'mongoose';

export interface IAccessory extends Document {
  description: string;
}

export interface ICar extends Document {
  model: string;
  color: string;
  year: string;
  value_per_day: number;
  accessories: IAccessory[];
  number_of_passengers: number;
}
