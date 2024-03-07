import { Injectable } from '@nestjs/common';
import { RattingsRepository } from './rattings.repository';

@Injectable()
export class RattingsService {
  constructor(private readonly rattingRepository: RattingsRepository) {}
  async createRate(newDataRate: any) {
    return await this.rattingRepository.create(newDataRate);
  }
  async getAllByRoom(idRoom: number) {
    return await this.rattingRepository.getAllByRoom(idRoom);
  }
  async getOneByUser(idUser: number) {
    return await this.rattingRepository.getOneByUser(idUser);
  }
}
