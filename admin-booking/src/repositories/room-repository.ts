import ApiService from "../api/api-services";
class RoomRepository {
  private apiService: ApiService;
  constructor() {
    this.apiService = new ApiService();
  }
  async getInformation(id: number): Promise<any> {
    const res = await this.apiService.getById("/api/v1/rooms", id);
    return res;
  }
  async getAllRoom(): Promise<any> {
    const res = await this.apiService.get("/api/v1/rooms/get-all-for-admin");
    return res;
  }
  async getByCondition(value: any, key: any) {
    const res = await this.apiService.getByCondition(
      "/api/v1/rooms",
      value,
      key
    );
    return res;
  }
  async setStockRoom(dataRoom: any, id: number): Promise<any> {
    const res = await this.apiService.patch(id, dataRoom, "/api/v1/rooms");
    return res;
  }
  async deleteRoom(id: number): Promise<any> {
    const res = await this.apiService.delete("/api/v1/rooms/remove", id);
    return res;
  }
  async uploadRoom(formData: any, id: number, dataKey: string) {
    return await this.apiService.uploadRoom(
      formData,
      `/api/v1/rooms/upload-room/${id}/?dataKey=${dataKey}`
    );
  }
  async update(formData: any, id: number) {
    return await this.apiService.patch(id, formData, "/api/v1/rooms/update");
  }
}
export default RoomRepository;
