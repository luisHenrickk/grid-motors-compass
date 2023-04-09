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
    required: [true, 'patio is required'],
    default: '',
  },
  complement: {
    type: String,
    required: [true, 'complement is required'],
    default: '',
  },
  neighborhood: {
    type: String,
    required: [true, 'neighborhood is required'],
    default: '',
  },
  locality: {
    type: String,
    required: [true, 'locality is required'],
    default: '',
  },
  uf: {
    type: String,
    required: [true, 'uf is required'],
    default: '',
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
