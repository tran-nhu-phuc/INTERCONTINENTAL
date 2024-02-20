import { DataTypes } from "sequelize";
import sequelize from "../configs/db.config";
import User from "./user.table";
import Room from "./room.table";
const Ratting = sequelize.define(
  "ratting",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
      autoIncrement: true,
      allowNull: false,
    },
    rate: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    roomId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
Ratting.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
User.hasMany(Ratting, {
  foreignKey: "userId",
});
Ratting.belongsTo(Room, {
  foreignKey: "roomId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Room.hasMany(Ratting, {
  foreignKey: "roomId",
});
export default Ratting;
