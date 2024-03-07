import { Injectable } from '@nestjs/common';
import { AdminsRepository } from './admins.repository';

@Injectable()
export class AdminsService {
  constructor(private readonly adminRepository: AdminsRepository) {}

  async findOneByEmail(email: string) {
    try {
      return await this.adminRepository.findOneByEmail(email);
    } catch (error) {
      throw { msg: 'Error not found', error };
    }
  }

  async create(newData: any) {
    try {
      return await this.adminRepository.create(newData);
    } catch (error) {
      throw { msg: 'Error business', error };
    }
  }
  async updateAdmin(id: number, newData: any) {
    try {
      return await this.adminRepository.update(id, newData);
    } catch (error) {
      throw error;
    }
  }
}
