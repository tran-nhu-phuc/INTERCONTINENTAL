import { InjectRepository } from '@nestjs/typeorm';
import { ImageRoom } from 'src/entities/imageRooms.entities';
import { Repository } from 'typeorm';

export class ImageRoomRepository {
  constructor(
    @InjectRepository(ImageRoom)
    private imageRepository: Repository<ImageRoom>,
  ) {}

  async create(newData: any) {
    try {
      return await this.imageRepository.save(newData);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, newData: any) {
    try {
      return await this.imageRepository.update({ roomId: id }, newData);
    } catch (error) {
      throw error;
    }
  }
}
