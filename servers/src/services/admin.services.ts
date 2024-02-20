import AdminRepository from "../repositories/admin.repositories";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
class AdminService {
  private repository: AdminRepository;
  constructor() {
    this.repository = new AdminRepository();
  }
  async createAdmin(newData: any) {
    return await this.repository.createAdmin(newData);
  }
  async loginAdmin(dataForm: any) {
    try {
      const checkUser = await this.repository.loginAdmin(dataForm.email);
      if (checkUser?.dataValues) {
        const compareDataUser = bcrypt.compareSync(
          dataForm.password,
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
  async updateAdmin(id: number, newData: any) {
    return await this.repository.updateAdmin(id, newData);
  }
}
export default AdminService;
