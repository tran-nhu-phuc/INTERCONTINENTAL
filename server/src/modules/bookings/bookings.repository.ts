import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from 'src/entities/bookings.entities';
import { Repository } from 'typeorm';

export class BookingsRepository {
  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,
  ) {}

  async findAll() {
    try {
      return await this.bookingRepository.find({ relations: ['customerInFo'] });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      return await this.bookingRepository.findOneBy({ id });
    } catch (error) {
      throw error;
    }
  }

  async findAllById(userId: number) {
    try {
      return await this.bookingRepository.query(
        `SELECT bookings.id AS bookingId, rooms.id AS roomId, imageRooms.id AS imageRoomId, bookings.isDelete AS bookingDelete, rooms.isDelete AS roomDelete,bookings.status AS statusBooking,rooms.status AS statusRoom, bookings.*, rooms.*, imageRooms.*
      FROM bookings
      LEFT JOIN rooms ON bookings.roomId = rooms.id
      LEFT JOIN imageRooms ON rooms.id = imageRooms.roomId
      WHERE bookings.userId = ${userId};
      `,
      );
    } catch (error) {
      throw error;
    }
  }

  async create(newData: any) {
    try {
      return await this.bookingRepository.save(newData);
    } catch (error) {
      throw error;
    }
  }
  async update(id: number, newData: any) {
    try {
      return await this.bookingRepository.update({ id }, newData);
    } catch (error) {
      throw error;
    }
  }
}
