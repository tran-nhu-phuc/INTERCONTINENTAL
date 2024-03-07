import { Injectable } from '@nestjs/common';
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';

@Injectable()
export class UploadService {
  async uploadFile(file: any, nameFolder?: string): Promise<string> {
    try {
      const result: UploadApiResponse = await cloudinary.uploader.upload(
        file?.path,
        {
          folder: nameFolder ?? 'booking_hotel',
        },
      );
      return result.url;
    } catch (error) {
      throw error;
    }
  }
  async uploadFiles(files: any[], nameFolder?: string): Promise<string[]> {
    try {
      const uploadPromises = files.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: nameFolder || 'booking_hotel',
        });
        return result.url;
      });
      return Promise.all(uploadPromises);
    } catch (error) {
      throw error;
    }
  }
}
