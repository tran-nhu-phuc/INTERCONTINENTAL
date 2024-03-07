import { Module } from '@nestjs/common';
import { AdminsController } from './admins.controller';
import { AdminsService } from './admins.service';
import { AdminsRepository } from './admins.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'src/entities/admins.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Admin])],
  controllers: [AdminsController],
  providers: [AdminsService, AdminsRepository],
  exports: [AdminsService],
})
export class AdminsModule {}
