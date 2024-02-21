import express, { Request, Response } from "express";
import AdminService from "../services/admin.services";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AuthorLogin from "../middlewares/check-authen.middleware";
import checkRolesUsers from "../middlewares/check-role-user.middleware";
import checkStatusUsers from "../middlewares/check-status.middleware";
const adminController = express.Router();
const adminServices = new AdminService();
adminController
  .post(
    "/add-admin",
    AuthorLogin,
    checkRolesUsers,
    checkStatusUsers,
    async (req: Request, res: Response) => {
      try {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(req.body.password, salt);
        const newDataUser = {
          password: hash,
          email: req.body.email,
          role: 1,
        };
        await adminServices.createAdmin(newDataUser);
        res.json("create ok");
      } catch (error) {
        res.json(error);
      }
    }
  )
  .post(
    "/login-admin",
    AuthorLogin,
    checkRolesUsers,
    checkStatusUsers,
    async (req: any, res: Response) => {
      try {
        const dataForm = {
          password: req.body.password,
          email: req.body.email,
        };
        const result = await adminServices.loginAdmin(dataForm);
        if (result == 0) {
          res.status(404).json("email fail");
        } else if (result == 1) {
          res.status(400).json("password sai");
        } else {
          req.session.loginAdmin = result;
          res.json(result);
        }
      } catch (error) {
        res.status(404).json("Error Login");
      }
    }
  )
  .patch(
    "/update-admin/:id",
    AuthorLogin,
    checkRolesUsers,
    checkStatusUsers,
    async (req: Request, res: Response) => {
      try {
        const id = Number(req.body.id);
        const newData = {
          ...req.body,
        };
        const result = await adminServices.updateAdmin(id, newData);
        if (result[0] === 0) {
          res.status(403).json("fail update");
        } else {
          res.status(203).json("ok update");
        }
      } catch (error) {
        res.json(error);
      }
    }
  )
  .post(
    "/",
    AuthorLogin,
    checkRolesUsers,
    checkStatusUsers,
    (req: Request, res: Response) => {
      try {
        const token = req.body.token;
        var decoded = jwt.verify(token, "secret");
        res.json(decoded);
      } catch (err) {
        res.json(err);
      }
    }
  );
export default adminController;
