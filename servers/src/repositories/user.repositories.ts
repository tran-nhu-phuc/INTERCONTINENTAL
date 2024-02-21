import { Op } from "sequelize";
import User from "../entities/user.table";
import Point from "../entities/point.table";
import { UsersType } from "../types/user.type";

class UserRepository {
  async register(newDataUser: any) {
    return await User.create(newDataUser);
  }
  async login(email: string) {
    return await User.findOne({
      where: {
        email,
      },
    });
  }
  async resetPassword(email: string, password: string) {
    return await User.update(
      { password },
      {
        where: {
          email,
        },
      }
    );
  }
  async uploadAvatar(avatar: string, id: number) {
    return await User.update({ avatar }, { where: { id } });
  }
  async updateStatus(id: number, status: number) {
    return await User.update({ status }, { where: { id } });
  }
  async getAll(sort: any, limit: number, offset: number) {
    if (sort) {
      return await User.findAll({
        order: [["id", sort]],
        offset,
        limit,
      });
    }
    return await User.findAll({
      offset,
      limit,
    });
  }
  async getInFo(id: number) {
    return await User.findOne({ where: { id }, include: Point });
  }
  async updateProfile(id: number, newData: UsersType) {
    return await User.update(
      { ...newData },
      {
        where: {
          id,
        },
      }
    );
  }
}
export default UserRepository;
