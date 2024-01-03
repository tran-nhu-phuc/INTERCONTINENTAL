import ApiService from "../api/api-services";

class UserRepository {
  private apiService: ApiService;
  constructor() {
    this.apiService = new ApiService();
  }

  async register(formRequestModel: any): Promise<any> {
    const res = await this.apiService.post("register", formRequestModel);
    return res;
  }

  async login(formRequestModel: any): Promise<any> {
    const res = await this.apiService.post("login", formRequestModel);
    return res;
  }
  async getInformation(id: number): Promise<any> {
    const res = await this.apiService.getById("users", id);
    return res;
  }
  async getAllUser(): Promise<any> {
    const res = await this.apiService.get("users");
    return res;
  }
  async setStatusUser(dataRoom: any, id: number): Promise<any> {
    const res = await this.apiService.patch(id, dataRoom, "users");
    return res;
  }
}
export default UserRepository;
