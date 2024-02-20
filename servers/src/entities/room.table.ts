import { DataTypes } from "sequelize";
import sequelize from "../configs/db.config";
import Category from "./category.table";
const Room = sequelize.define(
  "room",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    status: {
      // 1
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    stock: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    countUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isDelete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
Room.belongsTo(Category, {
  foreignKey: "categoryId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Category.hasMany(Room, {
  foreignKey: "categoryId",
});
export default Room;
