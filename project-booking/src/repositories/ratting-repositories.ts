import ApiService from "../api/api-services";

class RattingRepository {
  private apiService: ApiService;
  constructor() {
    this.apiService = new ApiService();
  }
  async getAllByRoom(idRoom: number) {
    return await this.apiService.getById(
      "/api/v1/rates/get-all-by-room",
      idRoom
    );
  }
  async addNewRatting(newData: any) {
    return await this.apiService.post("/api/v1/rates/add-rate", newData);
  }
}
export default RattingRepository;
