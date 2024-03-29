import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { CommentsService } from './comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentService: CommentsService) {}

  @Get('get-all-comment/:idRoom')
  async findAllByRoom(@Param() params) {
    try {
      const idRoom = Number(params.idRoom);
      return await this.commentService.getAllByRoom(idRoom);
    } catch (error) {
      return { msg: 'Error', error };
    }
  }

  @Post('add-comment')
  async createComment(@Body() body) {
    try {
      const newData = {
        content: body.content,
        userId: body.userId,
        roomId: body.roomId,
      };
      return await this.commentService.createComment(newData);
    } catch (error) {
      return { msg: 'Error', error };
    }
  }
  @Patch('update-comment/:id')
  async updateComment(@Param() params, @Body() body) {
    try {
      const id = Number(params.id);
      const newData = {
        ...body,
      };
      return await this.commentService.updateComment(id, newData);
    } catch (error) {
      return { msg: 'Error', error };
    }
  }
  @Delete('remove-comment/:id')
  async removeComment(@Param() params, @Res() res) {
    try {
      const id = Number(params.id);
      const result: any = await this.commentService.removeComment(id);
      if (result[0] === 0) {
        return res.status(404).json(0);
      } else {
        return res.status(204).json(1);
      }
    } catch (error) {
      return res.json(error);
    }
  }
}
