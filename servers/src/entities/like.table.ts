import { DataTypes } from "sequelize";
import sequelize from "../configs/db.config";
import User from "./user.table";
import Comment from "./comment.table";
const Like = sequelize.define(
  "like",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
      autoIncrement: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    commentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
  }
);
Like.belongsTo(User, {
  foreignKey: "userId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
User.hasMany(Like, {
  foreignKey: "userId",
});
Like.belongsTo(Comment, {
  foreignKey: "commentId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Comment.hasMany(Like, {
  foreignKey: "commentId",
});
export default Like;
