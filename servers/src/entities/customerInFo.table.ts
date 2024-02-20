import { DataTypes } from "sequelize";
import sequelize from "../configs/db.config";
import Booking from "./booking.table";
const CustomerInFo = sequelize.define(
  "customerInFo",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
      autoIncrement: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nameRoom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    countryCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bookingId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
CustomerInFo.belongsTo(Booking, {
  foreignKey: "bookingId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Booking.hasOne(CustomerInFo, {
  foreignKey: "bookingId",
});
export default CustomerInFo;
