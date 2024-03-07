import { Injectable } from '@nestjs/common';
import { ImageRoomRepository } from './image-rooms.repositories';

@Injectable()
export class ImageRoomsService {
  constructor(private readonly imageRoomRepository: ImageRoomRepository) {}

  async create(newData: any) {
    try {
      return await this.imageRoomRepository.create(newData);
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, newData: any) {
    try {
      return await this.imageRoomRepository.update(id, newData);
    } catch (error) {
      throw error;
    }
  }
}
