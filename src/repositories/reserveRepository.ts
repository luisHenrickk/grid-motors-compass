import { ReserveDTO } from '../schemas/reserve/dto/reserveDTO';
import { IReserve } from '../schemas/reserve/IReserve';
import Reserve from '../schemas/reserve/reserveSchema';

class ReserveRepository {
  public async findAll(queryStr: string, page: number, limit: number): Promise<IReserve[]> {
    const startIndex = (page - 1) * limit;
    let query = Reserve.find(JSON.parse(queryStr));
    query = query.select('-__v');
    query = query.skip(startIndex).limit(limit);

    return await query;
  }

  public async findById(id: string): Promise<IReserve | null> {
    return await Reserve.findById(id);
  }

  public async create(reserveDto: ReserveDTO): Promise<IReserve> {
    return await Reserve.create(reserveDto);
  }

  public async delete(id: string): Promise<any> {
    return await Reserve.findByIdAndDelete(id);
  }

  public async update(id: string, reserveDto: ReserveDTO): Promise<IReserve | null> {
    return await Reserve.findByIdAndUpdate(id, reserveDto, {
      new: true,
      runValidators: true,
    });
  }
}

export default new ReserveRepository();
