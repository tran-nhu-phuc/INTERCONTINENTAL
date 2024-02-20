import RoomRepository from "../repositories/room.repositories";
import { UpdateRoom } from "../types/room.type";

class RoomService {
  private repository: RoomRepository;
  constructor() {
    this.repository = new RoomRepository();
  }
  async CreateRoom(newDataRoom: any) {
    return await this.repository.CreateRoom(newDataRoom);
  }
  async getAll(sort: any, limit: number, page: number) {
    let offset = Math.ceil((page - 1) * limit);
    const result = await this.repository.getAll(sort, limit, offset);
    return result?.filter((item: any) => {
      return item.stock > 0 && item.isDelete !== true;
    });
  }
  async getInFo(id: number) {
    return await this.repository.getInFo(id);
  }
  async removeRoom(id: number) {
    const result = await this.repository.removeRoom(id);
    if (result[0] !== 0) {
      return 1;
    } else {
      return 0;
    }
  }
  async updateRoom(id: number, newData: UpdateRoom) {
    return await this.repository.updateRoom(id, newData);
  }
  async uploadRoom(newData: any, id: number) {
    const result = await this.repository.uploadRoom(newData, id);
    if (result[0] !== 0) {
      return 1;
    } else {
      return 0;
    }
  }
  async getAllForAdmin() {
    return await this.repository.getAllForAdmin();
  }
}
export default RoomService;
