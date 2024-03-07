import { Body, Controller, Delete, Param, Post } from '@nestjs/common';
import { LikesService } from './likes.service';

@Controller('likes')
export class LikesController {
  constructor(private readonly likeService: LikesService) {}
  @Post('add-like')
  async createLike(@Body() body) {
    try {
      const newData = {
        userId: Number(body.userId),
        commentId: Number(body.commentId),
      };
      return await this.likeService.create(newData);
    } catch (error) {
      return { msg: 'Error', error };
    }
  }

  @Delete('remove-like/:id')
  async removeLike(@Param() params) {
    try {
      const id = Number(params.id);
      return await this.likeService.remove(id);
    } catch (error) {
      return { msg: 'Error', error };
    }
  }
}
