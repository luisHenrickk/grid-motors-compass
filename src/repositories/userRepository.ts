import { UserDTO } from '../schemas/user/dto/userDTO';
import { IUser } from '../schemas/user/IUser';
import User from '../schemas/user/userSchema';

class UserRepository {
  public async findAll(): Promise<IUser[]> {
    return await User.find();
  }

  public async findById(id: string): Promise<IUser | null> {
    return await User.findById(id);
  }

  public async create(userDto: UserDTO): Promise<IUser> {
    return await User.create(userDto);
  }

  public async delete(id: string): Promise<any> {
    return await User.findByIdAndDelete(id);
  }

  public async update(id: string, userDto: UserDTO): Promise<IUser | null> {
    return await User.findByIdAndUpdate(id, userDto, {
      new: true,
      runValidators: true,
    });
  }
}

export default new UserRepository();
