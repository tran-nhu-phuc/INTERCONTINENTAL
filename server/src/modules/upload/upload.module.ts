import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { MulterModule } from '@nestjs/platform-express';
import { cloudinaryConfig, multerConfig } from 'src/configs/cloudinary.config';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: multerConfig,
    }),
  ],
  controllers: [],
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {
  constructor() {
    cloudinaryConfig();
  }
}
