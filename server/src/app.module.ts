import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import typeOrmConfig from './configs/typesOrm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { AdminsModule } from './modules/admins/admins.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { AuthModule } from './modules/auth/auth.module';
import { RattingsModule } from './modules/rattings/rattings.module';
import { LikesModule } from './modules/likes/likes.module';
import { VouchersModule } from './modules/vouchers/vouchers.module';
import { CommentsModule } from './modules/comments/comments.module';
import { CheckUserId } from './middlewares/checkUserId.middleware';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from './interceptors/response.interceptor';
import { ImageRoomsModule } from './modules/image-rooms/image-rooms.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    AdminsModule,
    BookingsModule,
    RoomsModule,
    CategoriesModule,
    AuthModule,
    RattingsModule,
    LikesModule,
    VouchersModule,
    CommentsModule,
    ImageRoomsModule,
  ],
  controllers: [],
  providers: [
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: LoggingInterceptor,
    // },
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CheckUserId)
      .forRoutes(
        { path: 'users/upload-avatar/:id', method: RequestMethod.PATCH },
        { path: 'users/info/:id', method: RequestMethod.GET },
        { path: 'users/update-status/:id', method: RequestMethod.PATCH },
      );
  }
}
