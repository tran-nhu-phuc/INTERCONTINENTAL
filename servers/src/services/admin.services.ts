import AdminRepository from "../repositories/admin.repositories";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AdminTypes } from "../types/admin";
class AdminService {
  private repository: AdminRepository;
  constructor() {
    this.repository = new AdminRepository();
  }
  async createAdmin(newData: AdminTypes) {
    return await this.repository.createAdmin(newData);
  }
  async loginAdmin(dataForm: AdminTypes) {
    try {
      const checkUser = await this.repository.loginAdmin(
        dataForm?.email as string
      );
      if (checkUser?.dataValues) {
        const compareDataUser = bcrypt.compareSync(
          dataForm?.password as string,
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
  async updateAdmin(id: number, newData: AdminTypes) {
    return await this.repository.updateAdmin(id, newData);
  }
}
export default AdminService;
