import { DataTypes } from "sequelize";
import sequelize from "../configs/db.config";
import User from "./user.table";
import Room from "./room.table";
const Comment = sequelize.define(
  "comment",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
      autoIncrement: true,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
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
Comment.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
User.hasMany(Comment, {
  foreignKey: "userId",
});
Comment.belongsTo(Room, {
  foreignKey: "roomId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Room.hasMany(Comment, {
  foreignKey: "roomId",
});
export default Comment;
