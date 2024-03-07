import { InjectRepository } from '@nestjs/typeorm';
import { Ratting } from 'src/entities/rattings.entities';
import { Repository } from 'typeorm';

export class RattingsRepository {
  constructor(
    @InjectRepository(Ratting)
    private voucherRepository: Repository<Ratting>,
  ) {}
  async create(newDataRate: any) {
    try {
      return await this.voucherRepository.save(newDataRate);
    } catch (error) {
      throw error;
    }
  }
  async getAllByRoom(idRoom: number) {
    return await this.voucherRepository.findBy({ roomId: idRoom });
  }
  async getOneByUser(idUser: number) {
    try {
      return await this.voucherRepository.findOneBy({ userId: idUser });
    } catch (error) {
      throw error;
    }
  }
}
