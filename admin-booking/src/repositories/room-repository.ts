import ApiService from "../api/api-services";
import { Room } from "../type/type";

class RoomRepository {
  private apiService: ApiService;
  constructor() {
    this.apiService = new ApiService();
  }
  async getInformation(id: number): Promise<any> {
    const res = await this.apiService.getById("rooms", id);
    return res;
  }
  async getAllRoom(): Promise<any> {
    const res = await this.apiService.get("rooms");
    return res;
  }
  async getByCondition(value: any, key: any) {
    const res = await this.apiService.getByCondition("rooms", value, key);
    return res;
  }
  async setStockRoom(dataRoom: any, id: number): Promise<any> {
    const res = await this.apiService.patch(id, dataRoom, "rooms");
    return res;
  }
  async deleteRoom(id: number): Promise<any> {
    const res = await this.apiService.delete("rooms", id);
    return res;
  }
}
export default RoomRepository;
