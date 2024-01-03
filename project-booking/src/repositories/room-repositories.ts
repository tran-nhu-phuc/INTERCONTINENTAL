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
  async getByCondition(dataRoom: string): Promise<any> {
    const res = await this.apiService.get(dataRoom);
    return res;
  }
  async setStockRoom(dataRoom: any, id: number): Promise<any> {
    const res = await this.apiService.patch(id, dataRoom, "rooms");
    return res;
  }
}
export default RoomRepository;
