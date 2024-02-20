import { DataTypes } from "sequelize";
import sequelize from "../configs/db.config";
import Room from "./room.table";
const ImageRoom = sequelize.define(
  "imageRoom",
  {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
      unique: true,
      autoIncrement: true,
      allowNull: false,
    },
    linkImage1: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    linkImage2: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    linkImage3: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    linkImage4: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    linkImage5: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    roomId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: true,
  }
);
ImageRoom.belongsTo(Room, {
  foreignKey: "roomId",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Room.hasMany(ImageRoom, {
  foreignKey: "roomId",
});
export default ImageRoom;
