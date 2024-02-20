import ApiService from "../api/api-services";

class BookingRepository {
  private apiService: ApiService;
  constructor() {
    this.apiService = new ApiService();
  }
  async postBooking(dataBooking: any): Promise<any> {
    const res = await this.apiService.post("/api/v1/bookings", dataBooking);
    return res;
  }
  async getByCondition(value: any, key: any) {
    const res = await this.apiService.getByCondition(
      "/api/v1/bookings",
      value,
      key
    );
    return res;
  }
  async getAllData() {
    const res = await this.apiService.get("/api/v1/bookings/?limit=10000");
    return res;
  }
  async pathBooking(id: number, keyRoom: any) {
    const res = await this.apiService.patch(
      id,
      keyRoom,
      "/api/v1/bookings/update-status-booking"
    );
    return res;
  }
  async getAllPriceByDay() {
    return await this.apiService.get("/api/v1/bookings/price-in-thirty-day");
  }
}
export default BookingRepository;
