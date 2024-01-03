import UserRepository from "../repositories/user-repository";

class UserService {
  private userRepository: any;
  constructor() {
    this.userRepository = new UserRepository();
  }
  public async register(formRequestModel: any): Promise<any> {
    try {
      return await this.userRepository.register(formRequestModel);
    } catch (error: any) {
      throw error;
    }
  }
  public async login(formRequestModel: any): Promise<any> {
    try {
      return await this.userRepository.login(formRequestModel);
    } catch (error) {
      throw error;
    }
  }
  public async getInformation(id: number): Promise<any> {
    try {
      return await this.userRepository.getInformation(id);
    } catch (error) {
      throw error;
    }
  }
  public async getAllUser(): Promise<any> {
    try {
      return await this.userRepository.getAllUser();
    } catch (error) {
      throw error;
    }
  }
  async setStatusUser(dataRoom: any, id: number): Promise<any> {
    const res = await this.userRepository.setStatusUser(dataRoom, id);
    return res;
  }
}

export default UserService;
