import BookingRepository from "../repositories/booking-repository";
class BookingService {
  private bookingRepository: BookingRepository;
  constructor() {
    this.bookingRepository = new BookingRepository();
  }
  public async postBooking(dataBooking: any) {
    try {
      const res = this.bookingRepository.postBooking(dataBooking);
      return res;
    } catch (error) {
      throw error;
    }
  }
  public async getByCondition(value: any, key: any) {
    try {
      const res = await this.bookingRepository.getByCondition(value, key);
      return res;
    } catch (error) {
      throw error;
    }
  }
  public async getAllData() {
    try {
      const res = await this.bookingRepository.getAllData();
      return res;
    } catch (error) {
      throw error;
    }
  }
  public async pathBooking(id: number, keyRoom: any) {
    try {
      const res = await this.bookingRepository.pathBooking(id, keyRoom);
      return res;
    } catch (error) {
      throw error;
    }
  }
  async getAllPriceByDay() {
    return await this.bookingRepository.getAllPriceByDay();
  }
}

export default BookingService;
