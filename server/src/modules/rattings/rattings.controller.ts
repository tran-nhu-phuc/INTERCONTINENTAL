import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RattingsService } from './rattings.service';

@Controller('rattings')
export class RattingsController {
  constructor(private readonly rattingService: RattingsService) {}

  @Post('add-rate')
  async createRate(@Body() body) {
    try {
      const newDataRate = {
        rate: Number(body.rate),
        userId: Number(body.userId),
        roomId: Number(body.roomId),
      };
      return await this.rattingService.createRate(newDataRate);
    } catch (error) {
      return { msg: 'Error', error };
    }
  }

  @Get('get-all-by-room/:idRoom')
  async findAllByRoom(@Param() params) {
    try {
      const roomId = Number(params.idRoom);
      return await this.rattingService.getAllByRoom(roomId);
    } catch (error) {
      return { msg: 'Error', error };
    }
  }

  @Get('get-one-by-user/:idUser')
  async findOneByUser(@Param() params) {
    try {
      const userId = Number(params.idUser);
      return await this.rattingService.getOneByUser(userId);
    } catch (error) {
      return { msg: 'Error', error };
    }
  }
}
