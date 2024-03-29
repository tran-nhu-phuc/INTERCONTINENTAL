import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { MailService } from '../mail/mail.service';
import { Random } from 'random-js';
import * as bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { UploadService } from '../upload/upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/author.guard';
import { AuthAdminGuard } from 'src/guards/auth.admin.guard';
import { RoleAdminGuard } from 'src/guards/author.admin.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    private readonly mailService: MailService,
    private readonly fileService: UploadService,
  ) {}

  @Get()
  async getAllUser() {
    try {
      return await this.userService.getAllUser();
    } catch (error) {
      throw error;
    }
  }

  @Get('info/:id')
  @UseGuards(AuthGuard, RoleGuard)
  async getProfile(@Param() param) {
    try {
      return await this.userService.profile(Number(param?.id));
    } catch (error) {
      return error;
    }
  }

  @Post('forgot-password')
  async forGotPassword(@Body() body, @Res() res: Response) {
    const path = 'src/views/user.forgot.ejs';
    try {
      const random = new Random();
      const pinOtp = random.integer(10000, 99999);
      const sendMailToUser = await this.mailService.sendMail(
        body.email,
        'INTERCONTINENTAL HELLO',
        path,
        {
          pin: pinOtp,
        },
      );
      if (sendMailToUser) {
        let salt = bcrypt.genSaltSync(10);
        let hashRandom = bcrypt.hashSync(String(pinOtp), salt);
        const dataCookie = {
          hash_data: hashRandom,
          email: body.email,
        };
        res.cookie('otp', dataCookie, {
          expires: new Date(Date.now() + 120000),
          httpOnly: true,
          path: 'https://project-module-2.onrender.com/api/v1/users/check-pin',
        });
        return res.json({ msg: 'Ok', status: HttpStatus.OK, sendMailToUser });
      }
      return res.json({ msg: 'Fail', status: 400 });
    } catch (error) {
      return res.json({ msg: 'Error', error });
    }
  }

  @Post('check-pin')
  async checkPin(@Req() req: Request, @Res() res: Response) {
    try {
      const compareDataUser = bcrypt.compareSync(
        req?.body?.pin,
        req?.cookies?.otp?.hash_data,
      );
      if (compareDataUser) {
        res.cookie(
          'pin',
          { status: true },
          {
            expires: new Date(Date.now() + 120000),
            httpOnly: true,
          },
        );
        return res.status(201).json(1);
      } else {
        res.cookie(
          'pin',
          { status: false },
          {
            expires: new Date(Date.now() + 120000),
            httpOnly: true,
            path: 'https://project-module-2.onrender.com/api/v1/users/confirm-reset-password',
          },
        );
        return res.status(201).json(0);
      }
    } catch (error) {
      return res.json(error);
    }
  }

  @Post('confirm-reset-password')
  async resetPassword(@Req() req: Request, @Res() res: Response) {
    try {
      const compareDataUser = req.cookies?.pin?.status;
      if (compareDataUser) {
        const passwordNew = req.body?.password;
        const emailUser = req.cookies?.otp.email;
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(passwordNew, salt);
        await this.userService.resetPassword(emailUser, {
          password: hash,
        });
        return res.status(HttpStatus.OK).json({ msg: 'Change Password Ok' });
      }
    } catch (error) {
      return res.status(404).json({ msg: 'error reset password' });
    }
  }

  @Patch('upload-avatar/:id')
  @UseGuards(AuthGuard, RoleGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(
    @UploadedFile() file,
    @Res() res,
    @Param() param,
  ): Promise<string> {
    try {
      const id = Number(param?.id);
      const newImage = await this.fileService.uploadFile(file);
      const result = await this.userService.updateProfile(id, {
        avatar: newImage,
      });
      if (!result) {
        return res.status(404).json({ msg: 'fail upload' });
      } else {
        return res.status(201).json({ msg: 'upload ok' });
      }
    } catch (error) {
      throw error;
    }
  }

  @Patch('update-status/:id')
  @UseGuards(AuthAdminGuard, RoleAdminGuard)
  async updateStatus(@Param() param, @Body() body) {
    try {
      const id = Number(param?.id);
      const status = Number(body?.status);
      return await this.userService.updateStatus(id, status);
    } catch (error) {
      throw error;
    }
  }

  @Patch('change-profile/:id')
  @UseGuards(AuthGuard, RoleGuard)
  async updateProfile(@Param() param, @Body() body) {
    try {
      const id = Number(param?.id);
      const newData = { ...body };
      return await this.userService.updateProfile(id, newData);
    } catch (error) {
      throw error;
    }
  }
}
