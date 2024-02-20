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
  async uploadImage(avatar: any, id: number) {
    try {
      return await this.userRepository.uploadImage(avatar, id);
    } catch (error) {
      throw error;
    }
  }
  async updateUser(id: number, formData: any) {
    try {
      return await this.userRepository.updateUser(id, formData);
    } catch (error) {
      return error;
    }
  }
  async checkEmail(dataEmail: string) {
    try {
      return await this.userRepository.checkEmail(dataEmail);
    } catch (error) {
      throw error;
    }
  }
  async checkPin(valuePin: number) {
    try {
      return await this.userRepository.checkPin(valuePin);
    } catch (error) {
      throw error;
    }
  }
  async getAll() {
    try {
      return await this.userRepository.getAll();
    } catch (error) {
      throw error;
    }
  }
  async updatePassword(password: any) {
    try {
      return await this.userRepository.updatePassword(password);
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
