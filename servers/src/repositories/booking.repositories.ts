import { Op, QueryTypes } from "sequelize";
import sequelize from "../configs/db.config";
import Booking from "../entities/booking.table";
import CustomerInFo from "../entities/customerInFo.table";
import Room from "../entities/room.table";
import { v4 as uuidv4 } from "uuid";
import { BookingTypes } from "../types/bookings";
class BookingRepository {
  private data_old: number;
  constructor() {
    this.data_old = 0;
  }
  async getAll(sort: any, limit: number, offset: number) {
    if (sort) {
      return await Booking.findAll({
        order: [["id", sort]],
        offset,
        limit,
      });
    }
    return await Booking.findAll({
      offset,
      limit,
    });
  }
  async getInFo(id: number) {
    const result = await Booking.findOne({ where: { id } });
    return result;
  }
  async createPayment(dataPayment: BookingTypes) {
    const resultBooking = await Booking.create({
      roomId: dataPayment.roomId,
      timeCheckIn: dataPayment.timeCheckIn,
      timeCheckOut: dataPayment.timeCheckOut,
      paymentType: dataPayment.paymentType,
      nameRoom: dataPayment.nameRoom,
      totalPrice: dataPayment.totalPrice,
      numberRooms: dataPayment.numberRooms,
      phone: dataPayment.phone,
      userId: dataPayment.userId,
      code: uuidv4(),
      city: dataPayment.city,
      numberUser: dataPayment.numberUser,
      numberChild: dataPayment.numberChild,
      cityCode: dataPayment.cityCode,
      isVouchers: dataPayment.isVouchers,
      firstPrice: dataPayment.firstPrice,
    });
    const resultCustomInFo = await CustomerInFo.create({
      firstName: dataPayment.firstName,
      lastName: dataPayment.lastName,
      email: dataPayment.email,
      phone: dataPayment.phone,
      nameRoom: dataPayment.nameRoom,
      countryCode: dataPayment.countryCode,
      address: dataPayment.address,
      country: dataPayment.country,
      bookingId: resultBooking.dataValues.id,
    });
    const dataRoom: any = await Room.findOne({
      where: { id: resultBooking.dataValues.roomId },
    });
    const id = Number(resultBooking.dataValues.roomId);
    this.data_old = dataRoom.stock - resultBooking.dataValues.numberRooms;
    const resultRoom = await Room.update(
      { stock: dataRoom.stock - resultBooking.dataValues.numberRooms },
      {
        where: {
          id,
        },
      }
    );
    return {
      booking: resultBooking,
      customerInFo: resultCustomInFo,
      data: resultRoom[0] !== 0 ? 1 : 0,
    };
  }
  async getByUser(userId: number) {
    const result = await sequelize.query(
      `SELECT bookings.id AS bookingId, rooms.id AS roomId, imageRooms.id AS imageRoomId, bookings.isDelete AS bookingDelete, rooms.isDelete AS roomDelete,bookings.status AS statusBooking,rooms.status AS statusRoom, bookings.*, rooms.*, imageRooms.* 
      FROM bookings 
      LEFT JOIN rooms ON bookings.roomId = rooms.id 
      LEFT JOIN imageRooms ON rooms.id = imageRooms.roomId 
      WHERE bookings.userId = ${userId};
      `,
      { type: QueryTypes.SELECT }
    );
    return result;
  }
  async updateBooking(status: number, id: number) {
    const resultBooking = await Booking.update(
      { status },
      {
        where: {
          id,
        },
      }
    );
    if (
      status == 1 ||
      (status == 2 && resultBooking[0] === 1 && this.data_old !== 0)
    ) {
      const newDataBooking: any = await Booking.findOne({ where: { id } });
      const resultRoom = await Room.update(
        { stock: this.data_old },
        { where: { id: newDataBooking[0].roomId } }
      );
      return resultRoom;
    }
  }
  async changeIsDelete(id: number) {
    return await Booking.update(
      { isDelete: true },
      {
        where: {
          id,
        },
      }
    );
  }
  async priceInThirtyDay() {
    const result = await sequelize.query(
      "SELECT DATE(createdAt) as date, SUM(totalPrice) AS total_amount FROM bookings WHERE createdAt >= (CURDATE() - INTERVAL 30 DAY) GROUP BY DATE(createdAt) ORDER BY date DESC",
      { type: QueryTypes.SELECT }
    );
    return result;
  }
}
export default BookingRepository;
