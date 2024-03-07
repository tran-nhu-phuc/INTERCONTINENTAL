import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from 'src/entities/admins.entities';
import { Repository } from 'typeorm';

export class AdminsRepository {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  async findOneByEmail(email: string) {
    try {
      return await this.adminRepository.findOneBy({ email });
    } catch (error) {
      throw { msg: 'Error model', error };
    }
  }
  async create(newData: any) {
    try {
      return await this.adminRepository.save(newData);
    } catch (error) {
      throw { msg: 'Error model', error };
    }
  }

  async update(id: number, data: any) {
    try {
      return await this.adminRepository.update({ id }, data);
    } catch (error) {
      throw error;
    }
  }
}
