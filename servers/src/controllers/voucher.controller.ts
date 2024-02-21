import express, { Request, Response } from "express";
import VoucherService from "../services/voucher.services";
import AuthorLogin from "../middlewares/check-authen.middleware";
import checkRolesUsers from "../middlewares/check-role-user.middleware";
import checkStatusUsers from "../middlewares/check-status.middleware";
const voucherController = express.Router();
const voucherServices = new VoucherService();
voucherController
  .get(
    "/",
    AuthorLogin,
    checkRolesUsers,
    checkStatusUsers,
    async (req: Request, res: Response) => {
      try {
        const result = await voucherServices.getAll();
        res.status(200).json(result);
      } catch (error) {
        res.status(404).json(error);
      }
    }
  )
  .post(
    "/add-voucher",
    AuthorLogin,
    checkRolesUsers,
    checkStatusUsers,
    async (req: Request, res: Response) => {
      try {
        const newDataVoucher = {
          pointsNumber: Number(req.body.pointsNumber),
          discount: Number(req.body.discount),
          activationDate: req.body.activationDate || "",
        };
        const result = await voucherServices.createVoucher(newDataVoucher);
        if (result) {
          res.status(201).json("create voucher ok");
        } else {
          res.status(401).json("create voucher fail");
        }
      } catch (error) {
        res.json(error);
      }
    }
  )
  .post(
    "/voucher/:idUser",
    AuthorLogin,
    checkRolesUsers,
    checkStatusUsers,
    async (req: Request, res: Response) => {
      try {
        const idUser = Number(req.params.idUser);
        const discount = Number(req.body.discount);
        const result = await voucherServices.actionVoucher(idUser, discount);
        res.json(result);
      } catch (error) {
        res.json(error);
      }
    }
  )
  .post(
    "/voucher-date-vacation",
    AuthorLogin,
    checkRolesUsers,
    checkStatusUsers,
    async (req: Request, res: Response) => {
      try {
        const dateNow = req.body.dateNow;
        const discount = Number(req.body.discount);
        const result = await voucherServices.voucherVacation(dateNow, discount);
        res.json(result);
      } catch (error) {
        res.json(error);
      }
    }
  )
  .patch(
    "/use-voucher/:id",
    AuthorLogin,
    checkRolesUsers,
    checkStatusUsers,
    async (req: Request, res: Response) => {
      try {
        const id = Number(req.params.id);
        const idUser = Number(req.body.userId);
        const result = await voucherServices.getInFo(id, idUser);
        if (result?.status) {
          res.cookie("voucher", result, {
            expires: new Date(Date.now() + 1200000),
            httpOnly: true,
          });
          res.status(200).json(1);
        } else {
          res.cookie("voucher", result, {
            expires: new Date(Date.now() + 1200000),
            httpOnly: true,
          });
          res.status(400).json(2);
        }
      } catch (error) {
        res.status(404).json(error);
      }
    }
  );
export default voucherController;
