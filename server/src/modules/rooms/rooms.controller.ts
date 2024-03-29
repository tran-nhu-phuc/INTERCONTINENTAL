import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from '../upload/upload.service';

@Controller('rooms')
export class RoomsController {
  constructor(
    private readonly roomService: RoomsService,
    private readonly fileService: UploadService,
  ) {}

  @Get()
  async getAllRoom(@Query() query) {
    try {
      const sort = query.sort || undefined;
      const limit = Number(query.limit) || 7;
      const page = Number(query.page) || 1;
      return await this.roomService.getAllRoom(sort, limit, page);
    } catch (error) {
      return { msg: 'Error', error };
    }
  }

  @Get('detail/:id')
  async getDetails(@Param() params) {
    try {
      const id = Number(params.id);
      return await this.roomService.getInFo(id);
    } catch (error) {
      return { msg: 'Error detail' };
    }
  }

  @Post('add-room')
  @UseInterceptors(FilesInterceptor('files'))
  async createRoom(@UploadedFiles() files, @Body() body) {
    try {
      const newImage = await this.fileService.uploadFiles(files);
      const newDataRoom = {
        name: body.name,
        price: body.price,
        stock: body.stock,
        categoryId: body.categoryId,
        countUser: body.countUser,
        linkImage1:
          newImage[0] ||
          'https://th.bing.com/th/id/R.dac6ac7b9b93ade37f386b44c27fa8e0?rik=7fkA4FhB0QWV8g&pid=ImgRaw&r=0',
        linkImage2:
          newImage[1] ||
          'https://th.bing.com/th/id/R.dac6ac7b9b93ade37f386b44c27fa8e0?rik=7fkA4FhB0QWV8g&pid=ImgRaw&r=0',
        linkImage3:
          newImage[2] ||
          'https://th.bing.com/th/id/R.dac6ac7b9b93ade37f386b44c27fa8e0?rik=7fkA4FhB0QWV8g&pid=ImgRaw&r=0',
        linkImage4:
          newImage[3] ||
          'https://th.bing.com/th/id/R.dac6ac7b9b93ade37f386b44c27fa8e0?rik=7fkA4FhB0QWV8g&pid=ImgRaw&r=0',
        linkImage5:
          newImage[4] ||
          'https://th.bing.com/th/id/R.dac6ac7b9b93ade37f386b44c27fa8e0?rik=7fkA4FhB0QWV8g&pid=ImgRaw&r=0',
      };
      const result = await this.roomService.createRoom(newDataRoom);
      if (!result) {
        return { msg: 'fail create' };
      }
      return { msg: 'Create ok' };
    } catch (error) {
      throw { msg: error[`QueryFailedError`], error };
    }
  }

  @Patch('update/:id')
  async updateData(@Param() params, @Body() body) {
    try {
      const id = Number(params.id);
      const newData = {
        ...body,
      };
      return await this.roomService.updateRoom(id, newData);
    } catch (error) {
      return error;
    }
  }

  @Patch('upload-room/:id')
  @UseInterceptors(FilesInterceptor('file'))
  async uploadImageRoom(@UploadedFile() file, @Param() params, @Query() query) {
    try {
      const id = Number(params.id);
      const avatar = file;
      const key = query.dataKey;
      const newData = { [`${key}`]: avatar };
      return await this.roomService.updateImageRoom(id, newData);
    } catch (error) {
      throw error;
    }
  }

  @Delete('remove/:id')
  async removeRoom(@Param() params) {
    try {
      const id = Number(params.id);
      return await this.roomService.removeRoom(id);
    } catch (error) {
      return { msg: 'error delete' };
    }
  }
}
