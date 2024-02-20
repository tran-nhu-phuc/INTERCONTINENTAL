import UserRepository from "../repositories/user.repositories";
import { UsersType, UsersTypeLogin } from "../types/user.type";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
class UserService {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepository();
  }
  async register(newDataUser: UsersType) {
    const result = await this.userRepository.register(newDataUser);
    if (result.dataValues) {
      const { password, createAt, updateAt, ...userData } = result.dataValues;
      const accessToken = jwt.sign(userData, "secret");
      return {
        data: userData,
        accessToken,
      };
    }
  }
  async login(formData: UsersTypeLogin) {
    try {
      const checkUser = await this.userRepository.login(formData.email);
      if (checkUser?.dataValues) {
        const compareDataUser = bcrypt.compareSync(
          formData.password,
          checkUser.dataValues.password
        );
        const { password, createAt, updateAt, ...userData } =
          checkUser.dataValues;
        const accessToken = jwt.sign(userData, "secret");
        if (compareDataUser) {
          return {
            data: userData,
            accessToken,
          };
        } else {
          return 1;
        }
      } else {
        return 0;
      }
    } catch (error) {
      throw error;
    }
  }
  async resetPassword(email: string, password: string) {
    return await this.userRepository.resetPassword(email, password);
  }
  async uploadAvatar(avatar: string, id: number) {
    const result = await this.userRepository.uploadAvatar(avatar, id);
    if (result[0] === 0) {
      return 0;
    }
    return 1;
  }
  async updateStatus(id: number, status: number) {
    const result = await this.userRepository.updateStatus(id, status);
    if (result[0] === 0) {
      return 0;
    }
    return 1;
  }
  async getAll(sort: any, limit: number, page: number) {
    let offset = Math.ceil((page - 1) * limit);
    const result = await this.userRepository.getAll(sort, limit, offset);
    return result;
  }
  async getInFo(id: number) {
    const result = await this.userRepository.getInFo(id);
    return result;
  }
  async updateProfile(id: number, newData: any) {
    const result = await this.userRepository.updateProfile(id, newData);
    return result;
  }
}
export default UserService;
