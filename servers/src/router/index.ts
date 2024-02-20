import { Express } from "express";
import userController from "../controllers/user.controller";
import roomController from "../controllers/room.controller";
import categoryController from "../controllers/category.controller";
import bookingController from "../controllers/booking.controller";
import rateController from "../controllers/ratting.controller";
import commentController from "../controllers/comment.controller";
import voucherController from "../controllers/voucher.controller";
import adminController from "../controllers/admin.controller";
import likeController from "../controllers/like.controller";
const Router = (server: Express) => {
  server.use("/api/v1/users", userController);
  server.use("/api/v1/admins", adminController);
  server.use("/api/v1/rooms", roomController);
  server.use("/api/v1/categories", categoryController);
  server.use("/api/v1/bookings", bookingController);
  server.use("/api/v1/rates", rateController);
  server.use("/api/v1/comments", commentController);
  server.use("/api/v1/vouchers", voucherController);
  server.use("/api/v1/likes", likeController);
};
export default Router;
