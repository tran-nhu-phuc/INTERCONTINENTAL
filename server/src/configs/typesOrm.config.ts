import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Admin } from 'src/entities/admins.entities';
import { Booking } from 'src/entities/bookings.entities';
import { Category } from 'src/entities/categories.entities';
import { Comment } from 'src/entities/comments.entities';
import { CustomerInFo } from 'src/entities/customerInFo.entities';
import { ImageRoom } from 'src/entities/imageRooms.entities';
import { Like } from 'src/entities/likes.entities';
import { Point } from 'src/entities/points.entities';
import { Ratting } from 'src/entities/rattings.entities';
import { Room } from 'src/entities/rooms.entities';
import { User } from 'src/entities/users.entities';
import { Voucher } from 'src/entities/voucher.entities';
const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '02112004',
  database: 'project_booking',
  entities: [
    Admin,
    User,
    Booking,
    Category,
    Room,
    Comment,
    CustomerInFo,
    ImageRoom,
    Like,
    Point,
    Ratting,
    Voucher,
  ],
  synchronize: false, //sau khi tao table thi change true thành false để dữ liệu không bị đè lại
};

export default typeOrmConfig;
