import express, { Request, Response } from "express";
import UserService from "../services/user.services";
import bcrypt from "bcryptjs";
import { UsersType, UsersTypeLogin } from "../types/user.type";
import ejs from "ejs";
import path from "path";
import transporter from "../configs/mail.config";
import checkEmailUsers from "../middlewares/check-email-user.middleware";
import uploadCloud from "../configs/cloudinary.config";
import checkIdUsers from "../middlewares/check-id-user.middleware";
import { Random } from "random-js";
import checkRolesUsers from "../middlewares/check-role-user.middleware";
import AuthorLogin from "../middlewares/check-authen.middleware";
import checkStatusUsers from "../middlewares/check-status.middleware";
const userController = express.Router();
const userServices = new UserService();
userController
  .post("/register", async (req: Request, res: Response) => {
    try {
      let salt = bcrypt.genSaltSync(10);
      let hash = bcrypt.hashSync(req.body.password, salt);
      const newDataUser: UsersType = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: hash,
        email: req.body.email,
        phone: req.body.phone,
        role: 1,
      };
      const result = await userServices.register(newDataUser);
      if (result) {
        const dataHtml = await ejs.renderFile(
          path.join("src/views/confirm-register.ejs")
        );
        const sendMailToUser = await transporter.sendMail({
          to: result.data.email,
          subject: "INTERCONTINENTAL",
          html: dataHtml,
        });
        if (sendMailToUser) {
          res.json(result);
        } else {
          res.json(1);
        }
      } else {
        res.json(2);
      }
    } catch (error) {
      res.json(error);
    }
  })
  .post("/login", async (req: any, res: Response) => {
    try {
      const dataForm: UsersTypeLogin = {
        password: req.body.password,
        email: req.body.email,
      };
      const result = await userServices.login(dataForm);
      if (result === 0) {
        res.status(404).json(0);
      } else if (result === 1) {
        res.status(400).json(1);
      } else if (result.data) {
        req.session.login = result;
        res.json(result);
      }
    } catch (error) {
      res.status(404).json("Error Login");
    }
  })
  .get(
    "/logout",
    AuthorLogin,
    checkRolesUsers,
    checkStatusUsers,
    async (req: any, res: Response) => {
      await req.session.destroy(function (error: Error) {
        if (error) throw error;
        res.json("logout ok");
      });
    }
  )
  .post(
    "/forgot-password",
    checkEmailUsers,
    async (req: Request, res: Response) => {
      try {
        const random = new Random();
        const pinOtp = random.integer(10000, 99999);
        const dataHtml = await ejs.renderFile(
          path.join("src/views/send-code.ejs"),
          {
            pin: pinOtp,
          }
        );
        const sendMailToUser = await transporter.sendMail({
          to: req.body.email,
          subject: "Hello",
          html: dataHtml,
        });
        if (sendMailToUser) {
          let salt = bcrypt.genSaltSync(10);
          let hashRandom = bcrypt.hashSync(String(pinOtp), salt);
          const dataCookie = {
            hash_data: hashRandom,
            email: req.body.email,
          };
          res.cookie("otp", dataCookie, {
            expires: new Date(Date.now() + 120000),
            httpOnly: true,
            path: "http://localhost:8000/api/v1/users/check-pin",
          });
          res.status(200).json(2);
        } else {
          res.status(404).json("not found");
        }
      } catch (error) {
        res.json(error);
      }
    }
  )
  .post("/check-pin", (req: Request, res: Response) => {
    try {
      const compareDataUser = bcrypt.compareSync(
        req.body.pin,
        req.cookies.otp?.hash_data
      );
      if (compareDataUser) {
        res.cookie(
          "pin",
          { status: true },
          {
            expires: new Date(Date.now() + 120000),
            httpOnly: true,
          }
        );
        res.status(201).json(1);
      } else {
        res.cookie(
          "pin",
          { status: false },
          {
            expires: new Date(Date.now() + 120000),
            httpOnly: true,
          }
        );
        res.status(201).json(0);
      }
    } catch (error) {
      console.log("2" + error);
      res.json(error);
    }
  })
  .post("/confirm-reset-password", async (req: Request, res: Response) => {
    try {
      const compareDataUser = req.cookies?.pin?.status;
      if (compareDataUser) {
        const passwordNew = req.body?.password;
        const emailUser = req.cookies?.otp.email;
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(passwordNew, salt);
        const result = await userServices.resetPassword(emailUser, hash);
        if (result[0] !== 0) {
          res.status(203).json("change password ok");
        } else {
          res.status(401).json("fail change password");
        }
      }
    } catch (error) {
      console.log("3" + error);
      res.status(404).json("error reset password");
    }
  })
  .patch(
    "/upload-avatar/:id",
    AuthorLogin,
    checkRolesUsers,
    checkStatusUsers,
    checkIdUsers,
    uploadCloud.single("file"),
    async (req: Request, res: Response) => {
      try {
        const id = Number(req.params.id);
        const avatar = req.file?.path as string;
        const result = await userServices.uploadAvatar(avatar, id);
        if (!result) {
          res.status(404).json("fail upload");
        } else {
          res.status(201).json("upload ok");
        }
      } catch (error) {
        res.status(404).json(error);
      }
    }
  )
  .patch(
    "/update-status/:id",
    AuthorLogin,
    checkRolesUsers,
    checkStatusUsers,
    async (req: Request, res: Response) => {
      try {
        const id = Number(req.params.id);
        const status = Number(req.body.status);
        const result = await userServices.updateStatus(id, status);
        if (!result) {
          res.json("fail update status");
        }
        res.json("ok update status");
      } catch (error) {
        res.send(error);
      }
    }
  )
  .get(
    "/",
    AuthorLogin,
    checkRolesUsers,
    checkStatusUsers,
    async (req: Request, res: Response) => {
      try {
        const sort = req.query.sort || undefined;
        const limit = Number(req.query.limit) || 7;
        const page = Number(req.query.page) || 1;
        const result = await userServices.getAll(sort, limit, page);
        res.status(200).json(result);
      } catch (error) {
        res.status(404).json(error);
      }
    }
  )
  .get(
    "/info/:id",
    AuthorLogin,
    checkRolesUsers,
    checkStatusUsers,
    async (req: Request, res: Response) => {
      try {
        const id = Number(req.params.id);
        const result = await userServices.getInFo(id);
        res.json(result);
      } catch (error) {
        res.json(error);
      }
    }
  )
  .patch(
    "/change-profile/:id",
    AuthorLogin,
    checkRolesUsers,
    checkStatusUsers,
    async (req: Request, res: Response) => {
      try {
        const id = Number(req.params.id);
        const newData = {
          ...req.body,
        };
        const result = await userServices.updateProfile(id, newData);
        if (result[0] === 0) {
          res.status(403).json("fail update");
        } else {
          res.status(203).json("ok update");
        }
      } catch (error) {
        res.json(error);
      }
    }
  );
export default userController;
