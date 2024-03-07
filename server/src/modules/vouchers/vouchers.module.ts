import { Module } from '@nestjs/common';
import { VouchersController } from './vouchers.controller';
import { VouchersService } from './vouchers.service';
import { VouchersRepository } from './vouchers.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Voucher } from 'src/entities/voucher.entities';
import { PointsModule } from '../points/points.module';

@Module({
  imports: [PointsModule, TypeOrmModule.forFeature([Voucher])],
  controllers: [VouchersController],
  providers: [VouchersService, VouchersRepository],
})
export class VouchersModule {}
