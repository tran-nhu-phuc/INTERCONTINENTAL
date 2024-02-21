import express, { Request, Response } from "express";
import RateService from "../services/ratting.services";
import AuthorLogin from "../middlewares/check-authen.middleware";
import checkRolesUsers from "../middlewares/check-role-user.middleware";
import checkStatusUsers from "../middlewares/check-status.middleware";
const rateController = express.Router();
const rateServices = new RateService();
rateController
  .post(
    "/add-rate",
    AuthorLogin,
    checkRolesUsers,
    checkStatusUsers,
    async (req: Request, res: Response) => {
      try {
        const newDataRate = {
          rate: Number(req.body.rate),
          userId: Number(req.body.userId),
          roomId: Number(req.body.roomId),
        };
        const result = await rateServices.createRate(newDataRate);
        res.status(201).json(result);
      } catch (error) {
        res.status(401).json(error);
      }
    }
  )
  .get(
    "/get-all-by-room/:idRoom",
    AuthorLogin,
    checkRolesUsers,
    checkStatusUsers,
    async (req: Request, res: Response) => {
      try {
        const roomId = Number(req.params.idRoom);
        const result = await rateServices.getAllByRoom(roomId);
        res.json(result);
      } catch (error) {
        res.json(error);
      }
    }
  )
  .get(
    "/get-one-by-user/:idUser",
    AuthorLogin,
    checkRolesUsers,
    checkStatusUsers,
    async (req: Request, res: Response) => {
      const userId = Number(req.params.idUser);
      const result = await rateServices.getOneByUser(userId);
      res.status(200).json(result);
      try {
      } catch (error) {
        res.json(error);
      }
    }
  );
export default rateController;
