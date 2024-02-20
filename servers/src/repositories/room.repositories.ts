import { Op, Sequelize, where } from "sequelize";
import ImageRoom from "../entities/image-room.table";
import Room from "../entities/room.table";
import { UpdateRoom } from "../types/room.type";

class RoomRepository {
  async CreateRoom(newDataRoom: any) {
    const newRoom = await Room.create({
      name: newDataRoom.name,
      price: newDataRoom.price,
      stock: newDataRoom.stock,
      categoryId: newDataRoom.categoryId,
      countUser: newDataRoom.countUser,
    });
    const newImageRoom = await ImageRoom.create({
      roomId: newRoom.dataValues.id,
      linkImage1: newDataRoom.linkImage1,
      linkImage2: newDataRoom.linkImage2,
      linkImage3: newDataRoom.linkImage3,
      linkImage4: newDataRoom.linkImage4,
      linkImage5: newDataRoom.linkImage5,
    });
    return { room: newRoom, image: newImageRoom };
  }
  async getAll(sort: any, limit: number, offset: number) {
    if (sort) {
      return await Room.findAll({
        order: [["id", sort]],
        offset,
        limit,
        include: ImageRoom,
      });
    } else {
      return await Room.findAll({
        offset,
        limit,
        include: ImageRoom,
      });
    }
  }
  async getInFo(id: number) {
    return await Room.findOne({ where: { id }, include: ImageRoom });
  }
  async removeRoom(id: number) {
    return await Room.update(
      { isDelete: true },
      {
        where: {
          id,
        },
      }
    );
  }
  async updateRoom(id: number, newData: UpdateRoom) {
    return await Room.update(
      {
        ...newData,
      },
      {
        where: { id },
      }
    );
  }
  async uploadRoom(newData: any, id: number) {
    return await ImageRoom.update({ ...newData }, { where: { roomId: id } });
  }
  async getAllForAdmin() {
    return await Room.findAll();
  }
}
export default RoomRepository;
