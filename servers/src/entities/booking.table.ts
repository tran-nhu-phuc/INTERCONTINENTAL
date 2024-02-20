import { DataTypes } from "sequelize";
import sequelize from "../configs/db.config";
import User from "./user.table";
const Booking = sequelize.define(
  "booking",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
      autoIncrement: true,
      allowNull: false,
    },
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    timeCheckIn: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    timeCheckOut: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    paymentType: {
      //1 thanh toán trực tiếp  2 thanh toán online
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nameRoom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    numberRooms: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      // 1 đã booking 2 xác nhận booking 3 đã kết thức booking
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    isDelete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cityCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numberUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    numberChild: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    isVouchers: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    firstPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
Booking.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
User.hasMany(Booking, {
  foreignKey: "userId",
});
export default Booking;
