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
    const res = await this.apiService.post(
      "/api/v1/admins/login-admin",
      formRequestModel
    );
    return res;
  }
  async getInformation(id: number): Promise<any> {
    const res = await this.apiService.getById("users", id);
    return res;
  }
  async getAllUser(): Promise<any> {
    const res = await this.apiService.get("/api/v1/users/?limit=10000");
    return res;
  }
  async setStatusUser(dataUser: any, id: number): Promise<any> {
    const res = await this.apiService.patch(
      id,
      dataUser,
      "/api/v1/users/update-status"
    );
    return res;
  }
}
export default UserRepository;
