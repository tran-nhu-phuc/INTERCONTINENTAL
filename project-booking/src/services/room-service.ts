import RoomRepository from "../repositories/room-repositories";
import { Booking } from "../type/type";

class RoomService {
  private roomRepository: RoomRepository;
  constructor() {
    this.roomRepository = new RoomRepository();
  }
  public async getInformation(id: number): Promise<any> {
    try {
      return await this.roomRepository.getInformation(id);
    } catch (error) {
      throw error;
    }
  }
  public async getAllItem(endPointQuery: string) {
    try {
      return await this.roomRepository.getAllRoom(endPointQuery);
    } catch (error) {
      throw error;
    }
  }
  public async sortRoom(dataRoom: string = "rooms") {
    try {
      return await this.roomRepository.getByCondition(dataRoom);
    } catch (error) {
      return error;
    }
  }
  public async setStockRoom(id: number, dataRoom: any) {
    try {
      return await this.roomRepository.setStockRoom(dataRoom, id);
    } catch (error) {
      throw error;
    }
  }
}

export default RoomService;
