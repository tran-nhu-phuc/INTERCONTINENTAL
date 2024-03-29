import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from '../../dto/users/createUser.dto';
import { LoginUserDto } from 'src/dto/users/login.dto';
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  signIn(
    @Body() signInDto: LoginUserDto,
  ): Promise<{ access_token: string }> | {} {
    try {
      return this.authService.signIn(signInDto.email, signInDto.password);
    } catch (error) {
      return error;
    }
  }

  @Post('register')
  async register(@Body() body: CreateUserDto) {
    try {
      let salt = 10;
      let hash = bcrypt.hashSync(body.password, salt);
      const newData = {
        email: body?.email,
        password: hash,
        firstName: body?.firstName,
        lastName: body?.lastName,
        phone: body?.phone,
        role: 1,
      };
      const result = await this.authService.register(newData);
      if (result) {
        return { status: 201, access_token: result };
      } else {
        throw { msg: 'CREATE FAIL' };
      }
    } catch (error) {
      console.log(error);
      if (error[`sqlMessage`]) {
        return error[`sqlMessage`];
      }
      return error;
    }
  }

  @Post('login-admin')
  async loginAdmins(@Body() body) {
    try {
      const dataForm = {
        password: body.password,
        email: body.email,
      };
      const result = await this.authService.loginAdmin(dataForm);
      if (result == 0) {
        throw { msg: 'email fail' };
      } else if (result == 1) {
        throw { msg: 'password sai' };
      } else {
        return result;
      }
    } catch (error) {
      return { msg: 'Error login', error };
    }
  }

  @Post('register-admin')
  async registerAdmin(@Body() body) {
    try {
      let salt = bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync(body.password, salt);
      const newDataUser = {
        password: hash,
        email: body.email,
        role: 2,
      };
      await this.authService.createAdmin(newDataUser);
      return { msg: 'CREATE' };
    } catch (error) {
      return { msg: 'Error', error };
    }
  }
}
