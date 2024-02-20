import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import * as dotenv from "dotenv";
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
  secure: true,
});
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file: any) => {
    return {
      folder: "booking_hotel",
      format: "png",
    };
  },
});
const uploadCloud = multer({ storage: storage });
export default uploadCloud;
