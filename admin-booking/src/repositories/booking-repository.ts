import ApiService from "../api/api-services";

class BookingRepository {
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
  async getAllData() {
    const res = await this.apiService.get("bookings");
    return res;
  }
  async pathBooking(id: number, keyRoom: any) {
    const res = await this.apiService.patch(id, keyRoom, "bookings");
    return res;
  }
}
export default BookingRepository;
