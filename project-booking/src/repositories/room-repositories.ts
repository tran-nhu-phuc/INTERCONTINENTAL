import ApiService from "../api/api-services";
import { Room } from "../type/type";

class RoomRepository {
  private apiService: ApiService;
  constructor() {
    this.apiService = new ApiService();
  }
  async getInformation(id: number): Promise<any> {
    try {
      const res = await this.apiService.getById("/api/v1/rooms/detail", id);
      return res;
    } catch (error) {
      return error;
    }
  }
  async getAllRoom(endPointQuery: string): Promise<any> {
    try {
      const res = await this.apiService.get(`/api/v1/rooms${endPointQuery}`);
      return res;
    } catch (error) {
      return error;
    }
  }
  async getByCondition(dataRoom: string): Promise<any> {
    try {
      const res = await this.apiService.get(dataRoom);
      return res;
    } catch (error) {
      return error;
    }
  }
  async setStockRoom(dataRoom: any, id: number): Promise<any> {
    try {
      const res = await this.apiService.patch(id, dataRoom, "rooms");
      return res;
    } catch (error) {
      return error;
    }
  }
}
export default RoomRepository;
