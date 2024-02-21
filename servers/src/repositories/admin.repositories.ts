import Admin from "../entities/admin.table";
import { AdminTypes } from "../types/admin";

class AdminRepository {
  async createAdmin(newData: any) {
    await Admin.create(newData);
  }
  async loginAdmin(email: string) {
    return await Admin.findOne({
      where: {
        email,
      },
    });
  }
  async updateAdmin(id: number, newData: AdminTypes) {
    return await Admin.update({ ...newData }, { where: { id } });
  }
}
export default AdminRepository;
