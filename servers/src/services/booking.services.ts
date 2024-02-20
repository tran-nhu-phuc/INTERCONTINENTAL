import BookingRepository from "../repositories/booking.repositories";
import { BookingTypes } from "../types/bookings";

class BookingService {
  private repository: BookingRepository;
  constructor() {
    this.repository = new BookingRepository();
  }
  async getAll(sort: any, limit: number, page: number) {
    let offset = Math.ceil((page - 1) * limit);
    const result = await this.repository.getAll(sort, limit, offset);
    return result;
  }
  async getInFo(id: number) {
    const result = await this.repository.getInFo(id);
    return result;
  }
  async getByUser(id: number) {
    const result = await this.repository.getByUser(id);
    return result;
  }
  async createPayment(dataPayment: BookingTypes) {
    return await this.repository.createPayment(dataPayment);
  }
  async updateBooking(newStatus: number, id: number) {
    const result = await this.repository.updateBooking(newStatus, id);
    return result;
  }
  async changeIsDelete(id: number) {
    const result = await this.repository.changeIsDelete(id);
    return result;
  }
  async priceInThirtyDay() {
    return await this.repository.priceInThirtyDay();
  }
}
export default BookingService;
