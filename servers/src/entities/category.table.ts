import { DataTypes } from "sequelize";
import sequelize from "../configs/db.config";
const Category = sequelize.define(
  "category",
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
  },
  {
    timestamps: true,
  }
);
export default Category;
