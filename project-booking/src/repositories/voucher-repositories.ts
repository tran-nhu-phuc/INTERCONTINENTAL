import ApiService from "../api/api-services";

class VoucherRepository {
  private apiService: ApiService;
  constructor() {
    this.apiService = new ApiService();
  }
  async getAll() {
    return await this.apiService.get("/api/v1/vouchers");
  }
  async useVoucher(id: number, data: any) {
    return await this.apiService.patch(
      id,
      data,
      "/api/v1/vouchers/use-voucher"
    );
  }
}
export default VoucherRepository;
