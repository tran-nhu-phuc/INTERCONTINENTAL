import { InjectRepository } from '@nestjs/typeorm';
import { ImageRoom } from 'src/entities/imageRooms.entities';
import { Room } from 'src/entities/rooms.entities';
import { Repository } from 'typeorm';

export class RoomsRepository {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,
  ) {}

  async getAll(sort: any, limit: number, offset: number) {
    return await this.roomRepository.find({ order: { id: sort } });
  }

  async create(newData: any) {
    const newRoom = await this.roomRepository.save({
      name: newData.name,
      price: newData.price,
      stock: newData.stock,
      categoryId: newData.categoryId,
      countUser: newData.countUser,
    });
    return newRoom;
  }
  async finOne(id: number) {
    return await this.roomRepository.findOne({
      relations: {
        imageRoom: true,
      },
      where: { id },
    });
  }

  async update(id: number, newData: any) {
    return await this.roomRepository.update({ id }, newData);
  }

  async remove(id: number) {
    return await this.roomRepository.delete({ id });
  }
}
