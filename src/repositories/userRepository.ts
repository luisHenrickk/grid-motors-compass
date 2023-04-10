import { UpdateUserDTO } from '../schemas/user/dto/updateUserDTO';
import { UserDTO } from '../schemas/user/dto/userDTO';
import { IUser } from '../schemas/user/IUser';
import User from '../schemas/user/userSchema';

class UserRepository {
  public async findAll(queryStr: string, page: number, limit: number): Promise<IUser[]> {
    const startIndex = (page - 1) * limit;
    let query = User.find(JSON.parse(queryStr));
    query = query.select('-__v');
    query = query.skip(startIndex).limit(limit);

    return await query;
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

  public async update(id: string, updateUserDto: UpdateUserDTO): Promise<IUser | null> {
    return await User.findByIdAndUpdate(id, updateUserDto, {
      new: true,
      runValidators: true,
    });
  }
}

export default new UserRepository();
