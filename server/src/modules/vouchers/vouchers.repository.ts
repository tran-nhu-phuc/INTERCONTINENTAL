import { InjectRepository } from '@nestjs/typeorm';
import { Voucher } from 'src/entities/voucher.entities';
import { Repository } from 'typeorm';

export class VouchersRepository {
  constructor(
    @InjectRepository(Voucher)
    private voucherRepository: Repository<Voucher>,
  ) {}

  async finAll() {
    try {
      return await this.voucherRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async findOneById(id: number) {
    try {
      return await this.voucherRepository.findOneBy({ id });
    } catch (error) {
      throw error;
    }
  }

  async findOneByDiscount(discount: number) {
    try {
      return await this.voucherRepository.findOneBy({ discount });
    } catch (error) {
      throw error;
    }
  }

  async actionVoucher(id: number, oldPoint: number, voucherPoint: Number) {
    try {
      return await this.voucherRepository.update(
        { id },
        { pointsNumber: Number(oldPoint) - Number(voucherPoint) },
      );
    } catch (error) {
      throw error;
    }
  }

  async create(newData: any) {
    try {
      return await this.voucherRepository.save(newData);
    } catch (error) {
      throw error;
    }
  }
}
