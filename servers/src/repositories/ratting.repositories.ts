import Ratting from "../entities/ratting.table";
class RateRepository {
  async createRate(newDataRate: any) {
    return await Ratting.create(newDataRate);
  }
  async getAllByRoom(idRoom: number) {
    return await Ratting.findAll({ where: { roomId: idRoom } });
  }
  async getOneByUser(idUser: number) {
    return await Ratting.findOne({ where: { userId: idUser } });
  }
}
export default RateRepository;
