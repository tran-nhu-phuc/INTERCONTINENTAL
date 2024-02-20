import ApiService from "../api/api-services";

class OrderRepository {
  private apiService: ApiService;
  constructor() {
    this.apiService = new ApiService();
  }
  async postBooking(dataBooking: any): Promise<any> {
    try {
      const res = await this.apiService.post(
        "/api/v1/bookings/add-booking",
        dataBooking
      );
      return res;
    } catch (error) {
      return error;
    }
  }
  async getByCondition(value: any, key: any) {
    try {
      const res = await this.apiService.getByCondition("bookings", value, key);
      return res;
    } catch (error) {
      return error;
    }
  }
  async getAllByUser(idUser: any) {
    try {
      return await this.apiService.getAllByUser(
        `/api/v1/bookings/get-by-user`,
        idUser
      );
    } catch (error) {
      return error;
    }
  }
  async removeBooking(idBooking: number) {
    try {
      return await this.apiService.delete(
        "/api/v1/bookings/remove-booking",
        idBooking
      );
    } catch (error) {
      throw error;
    }
  }
}
export default OrderRepository;
