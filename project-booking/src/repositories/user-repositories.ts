import ApiService from "../api/api-services";

class UserRepository {
  private apiService: ApiService;
  constructor() {
    this.apiService = new ApiService();
  }

  async register(formRequestModel: any): Promise<any> {
    try {
      const res = await this.apiService.post(
        "/api/v1/users/register",
        formRequestModel
      );
      return res;
    } catch (error) {
      return error;
    }
  }

  async login(formRequestModel: any): Promise<any> {
    try {
      const res = await this.apiService.post(
        "/api/v1/users/login",
        formRequestModel
      );
      return res;
    } catch (error) {
      return error;
    }
  }

  async getInformation(id: number): Promise<any> {
    try {
      const res = await this.apiService.getById("/api/v1/users/info", id);
      return res;
    } catch (error) {
      return error;
    }
  }
  async uploadImage(formData: any, id: number) {
    try {
      return await this.apiService.uploadImage(
        "/api/v1/users/upload-avatar",
        formData,
        id
      );
    } catch (error) {
      return error;
    }
  }
  async updateUser(id: number, formData: any) {
    try {
      return await this.apiService.patch(
        id,
        formData,
        `/api/v1/users/change-profile`
      );
    } catch (error) {
      return error;
    }
  }
  async checkEmail(dataEmail: string) {
    try {
      return await this.apiService.checkEmail(
        { email: dataEmail },
        "/api/v1/users/forgot-password"
      );
    } catch (error) {
      throw error;
    }
  }
  async checkPin(valuePin: number) {
    try {
      return await this.apiService.checkPin("/api/v1/users/check-pin", {
        pin: valuePin,
      });
    } catch (error) {
      throw error;
    }
  }
  async getAll() {
    try {
      return await this.apiService.get("/api/v1/users/?limit=1000");
    } catch (error) {
      throw error;
    }
  }
  async updatePassword(password: any) {
    try {
      return await this.apiService.post(
        "/api/v1/users/confirm-reset-password",
        password
      );
    } catch (error) {}
  }
}
export default UserRepository;
