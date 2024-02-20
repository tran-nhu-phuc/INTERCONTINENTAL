import VoucherRepository from "../repositories/voucher-repositories";

class VoucherService {
  private voucherRepository: any;
  constructor() {
    this.voucherRepository = new VoucherRepository();
  }
  async getAll() {
    return await this.voucherRepository.getAll();
  }
  async useVoucher(id: number, data: any) {
    return await this.voucherRepository.useVoucher(id, data);
  }
}

export default VoucherService;
