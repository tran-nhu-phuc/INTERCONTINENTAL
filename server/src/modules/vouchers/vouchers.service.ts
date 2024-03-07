import { Injectable } from '@nestjs/common';
import { VouchersRepository } from './vouchers.repository';
import { PointsService } from '../points/points.service';

@Injectable()
export class VouchersService {
  constructor(
    private readonly voucherRepository: VouchersRepository,
    private readonly pointService: PointsService,
  ) {}

  async finAll() {
    try {
      return await this.voucherRepository.finAll();
    } catch (error) {
      throw error;
    }
  }

  async create(newData: any) {
    try {
      return await this.voucherRepository.create(newData);
    } catch (error) {
      throw error;
    }
  }

  async useVoucher(id: number, idUser: number) {
    try {
      const result = await this.voucherRepository.findOneById(id);
      const dataPoint = await this.pointService.findOneBy(idUser);
      if (Number(dataPoint?.pointNumber) >= Number(result?.pointsNumber)) {
        return {
          status: true,
          voucher: result?.discount,
        };
      } else {
        return {
          status: false,
          voucher: 0,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async voucherVacation(dateNow: string, discount: number) {
    const dataVoucher =
      await this.voucherRepository.findOneByDiscount(discount);
    if (Number(dateNow) >= Number(dataVoucher?.activationDate)) {
      return {
        data: true,
        discount: Number(dataVoucher?.discount),
      };
    }
    return {
      data: false,
    };
  }

  async actionVoucher(idUser: number, discount: number) {
    const dataPointByUser = await this.pointService.findOneBy(idUser);
    const dataVoucher =
      await this.voucherRepository.findOneByDiscount(discount);
    if (
      Number(dataPointByUser?.pointNumber) >= Number(dataVoucher?.pointsNumber)
    ) {
      const idPoint = Number(dataPointByUser?.id);
      const countPoint = Number(dataPointByUser?.pointNumber);
      const countPointVoucher = Number(dataVoucher?.pointsNumber);
      const result = await this.voucherRepository.actionVoucher(
        idPoint,
        countPoint,
        countPointVoucher,
      );
      if (result[0] === 0) {
        return {
          data: false,
        };
      }
      return {
        data: true,
        discount: Number(dataVoucher?.discount),
      };
    }
    return {
      data: false,
    };
  }
}
