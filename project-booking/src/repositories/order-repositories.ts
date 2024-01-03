import ApiService from "../api/api-services";

class OrderRepository {
  private apiService: ApiService;
  constructor() {
    this.apiService = new ApiService();
  }
  async postBooking(dataBooking: any): Promise<any> {
    const res = await this.apiService.post("bookings", dataBooking);
    return res;
  }
  async getByCondition(value: any, key: any) {
    const res = await this.apiService.getByCondition("bookings", value, key);
    return res;
  }
}
export default OrderRepository;
