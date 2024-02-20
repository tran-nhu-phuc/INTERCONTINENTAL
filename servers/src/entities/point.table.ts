import { DataTypes } from "sequelize";
import sequelize from "../configs/db.config";
import User from "./user.table";
import Room from "./room.table";
const Point = sequelize.define(
  "point",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
      autoIncrement: true,
      allowNull: false,
    },
    pointNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 15,
    },
    isDelete: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
Point.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
User.hasOne(Point, {
  foreignKey: "userId",
});
export default Point;
