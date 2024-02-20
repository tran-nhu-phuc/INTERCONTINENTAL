import Point from "../entities/point.table";
import Voucher from "../entities/voucher.table";

class VoucherRepository {
  async createVoucher(newDataVoucher: any) {
    return await Voucher.create(newDataVoucher);
  }
  async actionVoucher(id: number, oldPoint: number, voucherPoint: Number) {
    return await Point.update(
      { pointNumber: Number(oldPoint) - Number(voucherPoint) },
      { where: { id } }
    );
  }
  async getInFo(id: number) {
    return await Voucher.findOne({ where: { id } });
  }
  async getAll() {
    return await Voucher.findAll();
  }
}
export default VoucherRepository;
