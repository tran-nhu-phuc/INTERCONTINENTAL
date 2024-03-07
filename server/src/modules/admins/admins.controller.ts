import { Body, Controller, Patch, Post } from '@nestjs/common';
import { AdminsService } from './admins.service';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminService: AdminsService) {}

  @Patch('update-admin/:id')
  async updateAdmin(@Body() body) {
    try {
      const id = Number(body.id);
      const newData = {
        ...body,
      };
      const result = await this.adminService.updateAdmin(id, newData);
      if (result[0] === 0) {
        throw { msg: 'Fail update' };
      } else {
        return { msg: 'Updated' };
      }
    } catch (error) {
      return { msg: 'Error', error };
    }
  }
}
