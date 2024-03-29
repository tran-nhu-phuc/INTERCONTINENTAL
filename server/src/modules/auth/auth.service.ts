import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '../../dto/users/createUser.dto';
import { AdminsService } from '../admins/admins.service';
@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private adminsService: AdminsService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    try {
      const user = await this.usersService.finOne(email);
      if (!user) {
        throw new UnauthorizedException('Not Email');
      }
      const compareDataUser = await bcrypt.compare(pass, user.password);
      if (!compareDataUser) {
        throw new UnauthorizedException('Not Password');
      }
      const payload = {
        id: user?.id,
        email: user.email,
        role: user.role,
        name: user.firstName + ' ' + user.lastName,
        status: user.status,
      };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    } catch (error) {
      throw error;
    }
  }

  async register(newData: CreateUserDto) {
    try {
      const user = await this.usersService.finOne(newData?.email);
      if (user) {
        throw { msg: 'Email Already Exists' };
      }
      const data = await this.usersService.create(newData);
      if (data) {
        const payload = {
          id: data?.id,
          email: data.email,
          role: data.role,
          name: data.firstName + ' ' + data.lastName,
          status: data.status,
        };
        return this.jwtService.signAsync(payload);
      }
      return { msg: 'Error not create' };
    } catch (error) {
      throw error;
    }
  }

  async loginAdmin(dataForm: any) {
    try {
      const checkUser = await this.adminsService.findOneByEmail(
        dataForm?.email as string,
      );
      if (checkUser) {
        const compareDataUser = bcrypt.compareSync(
          dataForm?.password as string,
          checkUser.password,
        );
        const { password, createdAt, updatedAt, ...userData } = checkUser;
        const accessToken = {
          access_token: await this.jwtService.signAsync(userData),
        };
        if (compareDataUser) {
          return {
            data: userData,
            accessToken,
          };
        } else {
          return 1;
        }
      } else {
        return 0;
      }
    } catch (error) {
      throw error;
    }
  }

  async createAdmin(newData: any) {
    try {
      return await this.adminsService.create(newData);
    } catch (error) {
      throw error;
    }
  }
}
