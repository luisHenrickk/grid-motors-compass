import axios from 'axios';
import userRepository from '../repositories/userRepository';
import { UserDTO } from '../schemas/user/dto/userDTO';
import { IUser } from '../schemas/user/IUser';
import { BadRequestError, NotFoundError } from '../utils/api-errors';
import { isObjectIdOrHexString } from 'mongoose';

class UserService {
  public async findAll(query: any): Promise<IUser[]> {
    const { page = 1, limit = 100 } = query;
    const queryObj = { ...query };

    const excludedFields = ['select', 'sort', 'page', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    return userRepository.findAll(queryStr, page, limit);
  }

  public async findById(id: string): Promise<IUser | null> {
    if (!isObjectIdOrHexString(id)) {
      throw new BadRequestError('Invalid id provided');
    }
    const user = await userRepository.findById(id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  public async create(userDto: UserDTO): Promise<IUser> {
    const response = await axios.get(`https://viacep.com.br/ws/${userDto.cep.replace('-', '')}/json/`);
    const data = response.data;

    if (data.erro) {
      throw new NotFoundError('This Cep is not found');
    }
    userDto.patio = data.logradouro;
    userDto.neighborhood = data.bairro;
    userDto.complement = data.complemento;
    userDto.locality = data.localidade;
    userDto.uf = data.uf;

    return userRepository.create(userDto);
  }

  public async delete(id: string): Promise<any> {
    if (!isObjectIdOrHexString(id)) {
      throw new BadRequestError('Invalid id provided');
    }

    const doc = await userRepository.delete(id);

    if (!doc) {
      throw new NotFoundError('User not found');
    }
  }

  public async update(id: string, userDto: UserDTO): Promise<IUser | null> {
    if (!isObjectIdOrHexString(id)) {
      throw new BadRequestError('Invalid id provided');
    }

    const updatedUser = await userRepository.update(id, userDto);

    if (!updatedUser) {
      throw new NotFoundError('User not found');
    }

    return updatedUser;
  }
}

export default new UserService();
