import { Injectable } from '@nestjs/common';
import { RoomsRepository } from './rooms.repository';
import { ImageRoomsService } from '../image-rooms/image-rooms.service';

@Injectable()
export class RoomsService {
  constructor(
    private readonly roomRepository: RoomsRepository,
    private readonly imageRoomService: ImageRoomsService,
  ) {}

  async getAllRoom(sort: any, limit: number, page: number) {
    const result = await this.roomRepository.getAll(sort, limit, page);
    return result?.filter((item: any) => {
      return item.stock > 0 && item.isDelete !== true;
    });
  }

  async createRoom(newData: any) {
    const result = await this.roomRepository.create(newData);
    const newImageRoom = {
      roomId: result?.id,
      linkImage1: newData.linkImage1,
      linkImage2: newData.linkImage2,
      linkImage3: newData.linkImage3,
      linkImage4: newData.linkImage4,
      linkImage5: newData.linkImage5,
    };
    const resultImage = await this.imageRoomService.create(newImageRoom);
    return { newRoom: result, newImage: resultImage };
  }

  async getInFo(id: number) {
    return await this.roomRepository.finOne(id);
  }

  async updateRoom(id: number, newData: any) {
    return await this.roomRepository.update(id, newData);
  }

  async updateRoomAsBooking(id: number, numberRoom: number) {
    try {
      const findOneById = await this.roomRepository.finOne(id);
      const newData = {
        stock: findOneById?.stock - numberRoom,
      };
      return await this.roomRepository.update(id, newData);
    } catch (error) {
      throw { msg: 'Error logic', error };
    }
  }

  async removeRoom(id: number) {
    return await this.roomRepository.remove(id);
  }
  async updateImageRoom(id: number, newData: any) {
    return await this.imageRoomService.update(id, newData);
  }
}
