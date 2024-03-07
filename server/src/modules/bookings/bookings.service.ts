import { Injectable } from '@nestjs/common';
import { BookingsRepository } from './bookings.repository';
import { v4 as uuidv4 } from 'uuid';
import { CustomerRepository } from '../customer-info/customer-info.repositories';
import { CustomerInfoService } from '../customer-info/customer-info.service';
@Injectable()
export class BookingsService {
  constructor(
    private bookingRepository: BookingsRepository,
    private customerInFoRepository: CustomerInfoService,
  ) {}

  async findAll() {
    try {
      return await this.bookingRepository.findAll();
    } catch (error) {
      throw error;
    }
  }
  async findOne(id: number) {
    try {
      return await this.bookingRepository.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  async findAllByUser(userId) {
    try {
      return await this.bookingRepository.findAllById(userId);
    } catch (error) {
      throw error;
    }
  }

  async createBooking(newData: any) {
    try {
      const resultBooking = await this.bookingRepository.create({
        roomId: newData.roomId,
        timeCheckIn: newData.timeCheckIn,
        timeCheckOut: newData.timeCheckOut,
        paymentType: newData.paymentType,
        nameRoom: newData.nameRoom,
        totalPrice: newData.totalPrice,
        numberRooms: newData.numberRooms,
        phone: newData.phone,
        userId: newData.userId,
        code: uuidv4(),
        city: newData.city,
        numberUser: newData.numberUser,
        numberChild: newData.numberChild,
        cityCode: newData.cityCode,
        isVouchers: newData.isVouchers,
        firstPrice: newData.firstPrice,
      });
      const resultCustomInFo = await this.customerInFoRepository.create({
        firstName: newData.firstName,
        lastName: newData.lastName,
        email: newData.email,
        phone: newData.phone,
        nameRoom: newData.nameRoom,
        countryCode: newData.countryCode,
        address: newData.address,
        country: newData.country,
        bookingId: resultBooking.id,
      });
      return { booking: resultBooking, customerInFo: resultCustomInFo };
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, newData: any) {
    try {
      return await this.bookingRepository.update(id, newData);
    } catch (error) {
      throw error;
    }
  }
}
