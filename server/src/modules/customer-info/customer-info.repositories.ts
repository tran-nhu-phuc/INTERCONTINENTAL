import { InjectRepository } from '@nestjs/typeorm';
import { CustomerInFo } from 'src/entities/customerInFo.entities';
import { Repository } from 'typeorm';

export class CustomerRepository {
  constructor(
    @InjectRepository(CustomerInFo)
    private customerInFoRepository: Repository<CustomerInFo>,
  ) {}

  async create(newData: any) {
    return await this.customerInFoRepository.save(newData);
  }
}
