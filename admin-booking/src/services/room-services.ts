import ApiService from "../api/api-services";
import RoomRepository from "../repositories/room-repository";
import { Room } from "../type/type";

class RoomSerVices {
  private repository: RoomRepository;
  constructor() {
    this.repository = new RoomRepository();
  }
  async getInformation(id: number): Promise<any> {
    const res = await this.repository.getInformation(id);
    return res;
  }
  async getAllRoom(): Promise<any> {
    const res = await this.repository.getAllRoom();
    return res;
  }
  public async getByCondition(value: any, key: any) {
    try {
      const res = await this.repository.getByCondition(value, key);
      return res;
    } catch (error) {
      throw error;
    }
  }
  async setStockRoom(dataRoom: any, id: number): Promise<any> {
    const res = await this.repository.setStockRoom(dataRoom, id);
    return res;
  }
  async deleteRoom(id: number) {
    const res = await this.repository.deleteRoom(id);
    return res;
  }
  async uploadRoom(formData: any, id: number, dataKey: string) {
    return await this.repository.uploadRoom(formData, id, dataKey);
  }
  async update(id: number, formData: any) {
    return await this.repository.update(formData, id);
  }
}
export default RoomSerVices;
