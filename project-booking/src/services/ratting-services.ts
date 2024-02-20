import RattingRepository from "../repositories/ratting-repositories";

class RattingService {
  private rattingRepository: RattingRepository;
  constructor() {
    this.rattingRepository = new RattingRepository();
  }
  async getAllByRoom(idRoom: number, useId: number) {
    try {
      const result = await this.rattingRepository.getAllByRoom(idRoom);
      const dataRatting = [...result.data];
      const checkUser = dataRatting?.findIndex((item: any) => {
        return item.userId === useId;
      });

      if (checkUser === -1) {
        return {
          status: false,
          data: checkUser,
          allData: dataRatting,
          result: result,
        };
      } else {
        return {
          status: true,
          data: checkUser,
          allData: dataRatting,
        };
      }
    } catch (error) {
      throw error;
    }
  }
  async addNewRatting(newData: any) {
    try {
      return await this.rattingRepository.addNewRatting(newData);
    } catch (error) {
      throw error;
    }
  }
}

export default RattingService;
