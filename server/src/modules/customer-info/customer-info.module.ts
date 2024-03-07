import { Module } from '@nestjs/common';
import { CustomerInfoController } from './customer-info.controller';
import { CustomerInfoService } from './customer-info.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from 'src/entities/bookings.entities';
import { CustomerInFo } from 'src/entities/customerInFo.entities';
import { CustomerRepository } from './customer-info.repositories';

@Module({
  imports: [TypeOrmModule.forFeature([CustomerInFo, Booking])],
  controllers: [CustomerInfoController],
  providers: [CustomerInfoService, CustomerRepository],
  exports: [CustomerInfoService],
})
export class CustomerInfoModule {}
