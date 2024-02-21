import RateRepository from "../repositories/ratting.repositories";
import { RateTypes } from "../types/rates";
class RateService {
  private repository: RateRepository;
  constructor() {
    this.repository = new RateRepository();
  }
  async createRate(newDataRate: any) {
    return await this.repository.createRate(newDataRate);
  }
  async getAllByRoom(idRoom: number) {
    return await this.repository.getAllByRoom(idRoom);
  }
  async getOneByUser(idUser: number) {
    return await this.repository.getOneByUser(idUser);
  }
}
export default RateService;
