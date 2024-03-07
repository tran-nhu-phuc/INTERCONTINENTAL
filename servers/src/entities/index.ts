import Admin from "./admin.table";
import Booking from "./booking.table";
import Category from "./category.table";
import Comment from "./comment.table";
import CustomerInFo from "./customerInFo.table";
import ImageRoom from "./image-room.table";
import Like from "./like.table";
import Point from "./point.table";
import Ratting from "./ratting.table";
import Room from "./room.table";
import User from "./user.table";
import Voucher from "./voucher.table";

const createTable = () => {
  User.sync().then(() => {
    console.log("User create ok");
  });
  Booking.sync().then(() => {
    console.log("Booking create ok");
  });
  CustomerInFo.sync().then(() => {
    console.log("CustomerInFo create ok");
  });
  Room.sync().then(() => {
    console.log("Room create ok");
  });
  Point.sync().then(() => {
    console.log("Point create ok");
  });
  Category.sync().then(() => {
    console.log("Category create ok");
  });
  ImageRoom.sync().then(() => {
    console.log("ImageRoom create ok");
  });
  Comment.sync().then(() => {
    console.log("Comment create ok");
  });
  Ratting.sync().then(() => {
    console.log("Ratting create ok");
  });
  Voucher.sync().then(() => {
    console.log("Voucher create ok");
  });
  Admin.sync().then(() => {
    console.log("Admin create ok");
  });
  Like.sync().then(() => {
    console.log("Like create ok");
  });
};
export default createTable;
