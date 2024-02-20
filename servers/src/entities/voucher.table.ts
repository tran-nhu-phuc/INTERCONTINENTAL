import { DataTypes } from "sequelize";
import sequelize from "../configs/db.config";
const Voucher = sequelize.define(
  "voucher",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
      autoIncrement: true,
      allowNull: false,
    },
    pointsNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    discount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    activationDate: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    isDelete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
export default Voucher;
