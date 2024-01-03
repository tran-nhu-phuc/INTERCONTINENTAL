import UserRepository from "../repositories/user-repositories";

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
}

export default UserService;
