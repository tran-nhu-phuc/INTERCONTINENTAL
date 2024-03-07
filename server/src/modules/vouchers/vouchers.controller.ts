import { Body, Controller, Get, Param, Patch, Post, Res } from '@nestjs/common';
import { VouchersService } from './vouchers.service';

@Controller('vouchers')
export class VouchersController {
  constructor(private readonly voucherService: VouchersService) {}

  @Get()
  async finAll() {
    try {
      return await this.voucherService.finAll();
    } catch (error) {
      return { msg: 'Error', error };
    }
  }

  @Post('add-voucher')
  async create(@Body() body) {
    try {
      const newDataVoucher = {
        pointsNumber: Number(body.pointsNumber),
        discount: Number(body.discount),
        activationDate: body.activationDate || '',
      };
      const result = await this.voucherService.create(newDataVoucher);
      if (result) {
        return { msg: 'created ' };
      } else {
        return { msg: 'create voucher fail' };
      }
    } catch (error) {
      return { msg: 'Error', error };
    }
  }

  @Post('voucher-date-vacation')
  async voucherVacation(@Body() body) {
    try {
      const dateNow = body.dateNow;
      const discount = Number(body.discount);
      return await this.voucherService.voucherVacation(dateNow, discount);
    } catch (error) {
      return { msg: 'Error', error };
    }
  }

  @Post('voucher/:idUser')
  async actionVoucher(@Param() params, @Body() body) {
    try {
      const idUser = Number(params.idUser);
      const discount = Number(body.discount);
      return await this.voucherService.actionVoucher(idUser, discount);
    } catch (error) {
      return { msg: 'Error', error };
    }
  }

  @Patch('use-voucher/:id')
  async useVoucher(@Param() params, @Body() body, @Res() res) {
    try {
      const id = Number(params.id);
      const idUser = Number(body.userId);
      const result = await this.voucherService.useVoucher(id, idUser);
      if (result?.status) {
        res.cookie('voucher', result, {
          expires: new Date(Date.now() + 1200000),
          httpOnly: true,
        });
        return res.status(200).json(1);
      } else {
        res.cookie('voucher', result, {
          expires: new Date(Date.now() + 1200000),
          httpOnly: true,
        });
        return res.status(400).json(2);
      }
    } catch (error) {
      return res.status(404).json(error);
    }
  }
}
