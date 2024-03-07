import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AdminsModule } from '../admins/admins.module';
@Module({
  imports: [
    UsersModule,
    AdminsModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT,
      signOptions: { expiresIn: '1800s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
