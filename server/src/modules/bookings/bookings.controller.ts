import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingService: BookingsService) {}

  @Get()
  async findAll() {
    try {
      return await this.bookingService.findAll();
    } catch (error) {
      return { msg: 'Error', error };
    }
  }

  @Get('info/:id')
  async findOne(@Param() params) {
    try {
      const id = Number(params.id);
      return await this.bookingService.findOne(id);
    } catch (error) {
      return { msg: 'Error ', error };
    }
  }

  @Get('get-by-user/:idUser')
  async findAllByUser(@Param() params) {
    try {
      const id = Number(params.idUser);
      return await this.bookingService.findAllByUser(id);
    } catch (error) {
      return { msg: 'Error ', error };
    }
  }

  @Post('add-booking')
  async createBooking(@Body() body, @Req() req: any, @Res() res: any) {
    try {
      const voucher = req.cookies?.voucher?.voucher || 0;
      const newDataBooking = {
        roomId: Number(body.roomId),
        timeCheckIn: body.timeCheckIn,
        timeCheckOut: body.timeCheckOut,
        nameRoom: body.nameRoom,
        numberRooms: body.numberRooms,
        totalPrice: (1 - Number(voucher) / 100) * Number(body.totalPrice),
        userId: body.userId,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        countryCode: body.countryCode,
        address: body.address,
        country: body.country,
        city: body.city,
        numberUser: Number(body.numberUser),
        numberChild: Number(body.numberChild),
        cityCode: Number(body.cityCode),
        paymentType: Number(body.paymentType) || 1,
        isVouchers: Number(voucher) || 0,
        firstPrice: Number(body.totalPrice),
      };
      await this.bookingService.createBooking(newDataBooking);
      res.clearCookie('voucher');
      return res.status(201).json({ msg: 'CREATED' });
    } catch (error) {
      return res.json({ msg: 'Error', error });
    }
  }

  @Patch('update-status-booking/:id')
  async updateStatusBooking(@Param() params, @Body() body) {
    try {
      const id = Number(params.id);
      return await this.bookingService.update(id, {
        status: Number(body.status),
      });
    } catch (error) {
      return { msg: 'Error update status' };
    }
  }

  @Delete('remove-booking/:id')
  async removeBooking(@Param() params) {
    try {
      const id = Number(params.id);
      const newData = { isDelete: true };
      return await this.bookingService.update(id, newData);
    } catch (error) {
      return { msg: 'Error delete booking' };
    }
  }
}
