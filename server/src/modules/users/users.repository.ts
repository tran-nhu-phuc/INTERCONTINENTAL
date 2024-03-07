import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/dto/users/createUser.dto';
import { User } from 'src/entities/users.entities';
import { Repository } from 'typeorm';

export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll() {
    try {
      return await this.usersRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findOne(email: string) {
    try {
      return await this.usersRepository.findOneBy({ email });
    } catch (error) {
      throw error;
    }
  }
  async create(newData: CreateUserDto) {
    try {
      return await this.usersRepository.save(newData);
    } catch (error) {
      throw error;
    }
  }
  async findOneById(id: number) {
    try {
      return await this.usersRepository.findOneBy({ id });
    } catch (error) {
      throw error;
    }
  }
  async update(id: number, newData: any) {
    try {
      return await this.usersRepository.update({ id }, newData);
    } catch (error) {
      throw error;
    }
  }
  async updateByEmail(email: string, newData: any) {
    try {
      const updatedRows = await this.usersRepository.update({ email }, newData);
      if (updatedRows.affected === 0) {
        throw new Error(`No user found with email: ${email}`);
      }
      return updatedRows;
    } catch (error) {
      throw error;
    }
  }
}
