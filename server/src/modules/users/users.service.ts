import { Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async getAllUser() {
    try {
      return await this.userRepository.findAll();
    } catch (error) {
      throw error;
    }
  }

  async finOne(email: string) {
    try {
      return await this.userRepository.findOne(email);
    } catch (error) {
      throw error;
    }
  }
  async create(newData: any) {
    try {
      return await this.userRepository.create(newData);
    } catch (error) {
      throw error;
    }
  }

  async profile(id: number) {
    try {
      const result = await this.userRepository.findOneById(id);
      return result;
    } catch (error) {
      throw error;
    }
  }
  async updateStatus(id: number, status: number) {
    try {
      return await this.userRepository.update(id, { status });
    } catch (error) {
      throw error;
    }
  }
  async updateProfile(id: number, newData: any) {
    try {
      return await this.userRepository.update(id, newData);
    } catch (error) {
      throw error;
    }
  }
  async resetPassword(email: string, newData: any) {
    try {
      return await this.userRepository.updateByEmail(email, newData);
    } catch (error) {
      throw error;
    }
  }
}
