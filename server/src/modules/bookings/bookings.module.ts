import { Module } from '@nestjs/common';
import { BookingsController } from './bookings.controller';
import { BookingsService } from './bookings.service';
import { BookingsRepository } from './bookings.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Booking } from 'src/entities/bookings.entities';
import { User } from 'src/entities/users.entities';
import { CustomerInFo } from 'src/entities/customerInFo.entities';
import { CustomerInfoModule } from '../customer-info/customer-info.module';
import { RoomsModule } from '../rooms/rooms.module';

@Module({
  imports: [
    RoomsModule,
    CustomerInfoModule,
    TypeOrmModule.forFeature([Booking, User, CustomerInFo]),
  ],
  controllers: [BookingsController],
  providers: [BookingsService, BookingsRepository],
})
export class BookingsModule {}
