import { Injectable } from '@nestjs/common';
import { CustomerRepository } from './customer-info.repositories';

@Injectable()
export class CustomerInfoService {
  constructor(private readonly customerInFoRepository: CustomerRepository) {}
  async create(newData: any) {
    try {
      return await this.customerInFoRepository.create(newData);
    } catch (error) {
      throw error;
    }
  }
}
