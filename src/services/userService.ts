import axios from 'axios';
import userRepository from '../repositories/userRepository';
import { UserDTO } from '../schemas/user/dto/userDTO';
import { IUser } from '../schemas/user/IUser';
import { NotFoundError } from '../utils/api-errors';

class UserService {
  public async findAll(): Promise<IUser[]> {
    return userRepository.findAll();
  }

  public async findById(id: string): Promise<IUser | null> {
    const user = await userRepository.findById(id);

    if (!user) {
      throw new NotFoundError('User not found');
    }

    return user;
  }

  public async create(userDto: UserDTO): Promise<IUser> {
    const response = await axios.get(`https://viacep.com.br/ws/${userDto.cep}/json/`);
    const data = response.data;

    userDto.patio = data.logradouro;
    userDto.neighborhood = data.bairro;
    userDto.complement = data.complemento;
    userDto.locality = data.localidade;
    userDto.uf = data.uf;

    return userRepository.create(userDto);
  }

  public async delete(id: string): Promise<any> {
    const doc = await userRepository.delete(id);

    if (!doc) {
      throw new NotFoundError('User not found');
    }
  }

  public async update(id: string, userDto: UserDTO): Promise<IUser | null> {
    const updatedUser = await userRepository.update(id, userDto);

    if (!updatedUser) {
      throw new NotFoundError('User not found');
    }

    return updatedUser;
  }
}

export default new UserService();
