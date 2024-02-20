import Point from "../entities/point.table";
import Voucher from "../entities/voucher.table";
import VoucherRepository from "../repositories/voucher.repositories";

class VoucherService {
  private repository: VoucherRepository;
  constructor() {
    this.repository = new VoucherRepository();
  }
  async createVoucher(newDataVoucher: any) {
    return await this.repository.createVoucher(newDataVoucher);
  }
  async actionVoucher(idUser: number, discount: number) {
    const dataPointByUser = await Point.findOne({
      where: {
        userId: idUser,
      },
    });
    const dataVoucher = await Voucher.findOne({
      where: {
        discount: discount,
      },
    });
    if (
      dataPointByUser?.dataValues.pointNumber >=
      dataVoucher?.dataValues.pointsNumber
    ) {
      const idPoint = Number(dataPointByUser?.dataValues.id);
      const countPoint = Number(dataPointByUser?.dataValues.pointNumber);
      const countPointVoucher = Number(dataVoucher?.dataValues.pointsNumber);
      const result = await this.repository.actionVoucher(
        idPoint,
        countPoint,
        countPointVoucher
      );
      if (result[0] === 0) {
        return {
          data: false,
        };
      }
      return {
        data: true,
        discount: Number(dataVoucher?.dataValues.discount),
      };
    }
    return {
      data: false,
    };
  }
  async voucherVacation(dateNow: string, discount: number) {
    const dataVoucher = await Voucher.findOne({
      where: {
        discount,
      },
    });
    if (dateNow >= dataVoucher?.dataValues.activationDate) {
      return {
        data: true,
        discount: Number(dataVoucher?.dataValues.discount),
      };
    }
    return {
      data: false,
    };
  }
  async getInFo(id: number, userId: number) {
    try {
      const result = await this.repository.getInFo(id);
      const dataPoint = await Point.findOne({
        where: {
          userId,
        },
      });
      if (
        dataPoint?.dataValues?.pointNumber >= result?.dataValues?.pointsNumber
      ) {
        return {
          status: true,
          voucher: result?.dataValues?.discount,
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
  async getAll() {
    try {
      return await this.repository.getAll();
    } catch (error) {
      throw error;
    }
  }
}
export default VoucherService;
