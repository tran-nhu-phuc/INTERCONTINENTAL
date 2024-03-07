import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { error } from 'console';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class CheckUserId implements NestMiddleware {
  constructor(private userService: UsersService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req?.params?.id);
      const dataUser = await this.userService.profile(id);
      if (dataUser) {
        next();
      } else {
        res.json('Not Found');
      }
    } catch (error) {
      res.json({
        status: 404,
        msg: 'Not Found',
      });
    }
  }
}
