import mongoose, { Schema } from 'mongoose';
import { IUser } from './IUser';
import bcrypt from 'bcryptjs';

const UserSchema: Schema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'name is required'],
  },
  cpf: {
    type: String,
    required: [true, 'cpf is required'],
    unique: true,
  },
  birth: {
    type: Date,
    required: [true, 'birth is required'],
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, 'password is required'],
    minLenght: 6,
    select: false,
  },
  cep: {
    type: String,
    required: [true, 'cep is required'],
  },
  qualified: {
    type: String,
    enum: ['sim', 'não'],
    default: 'user',
  },
  patio: {
    type: String,
  },
  complement: {
    type: String,
  },
  neighborhood: {
    type: String,
  },
  locality: {
    type: String,
  },
  uf: {
    type: String,
  },
});

UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  next();
});

UserSchema.methods.isCorrectPassword = async function (candidatePassword: string, userPassword: string) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

export default mongoose.model<IUser>('User', UserSchema);
