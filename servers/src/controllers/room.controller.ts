import express, { Request, Response } from "express";
import RoomService from "../services/room.services";
import uploadCloud from "../configs/cloudinary.config";
import AuthorLogin from "../middlewares/check-authen.middleware";
import checkRolesUsers from "../middlewares/check-role-user.middleware";
import checkStatusUsers from "../middlewares/check-status.middleware";
const roomController = express.Router();
const roomServices = new RoomService();
roomController
  .get("/", async (req: Request, res: Response) => {
    try {
      const sort = req.query.sort || undefined;
      const limit = Number(req.query.limit) || 7;
      const page = Number(req.query.page) || 1;
      const result = await roomServices.getAll(sort, limit, page);
      res.status(200).json(result);
    } catch (error) {
      res.json(error);
    }
  })
  .get("/get-all-for-admin", async (req: Request, res: Response) => {
    try {
      const result = await roomServices.getAllForAdmin();
      res.status(200).json(result);
    } catch (error) {
      res.status(404).json(error);
    }
  })
  .get("/detail/:id", async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const result = await roomServices.getInFo(id);
      res.status(200).json(result);
    } catch (error) {
      res.json("error detail");
    }
  })
  .post(
    "/add-room",
    AuthorLogin,
    checkRolesUsers,
    checkStatusUsers,
    uploadCloud.array("files", 5),
    async (req: Request, res: Response) => {
      try {
        const changeFiles = req.files as Express.Multer.File[];
        const data = changeFiles?.map((item: Express.Multer.File) => {
          return item.path;
        });
        const newDataRoom = {
          name: req.body.name,
          price: req.body.price,
          stock: req.body.stock,
          categoryId: req.body.categoryId,
          countUser: req.body.countUser,
          linkImage1:
            data[0] ||
            "https://th.bing.com/th/id/R.dac6ac7b9b93ade37f386b44c27fa8e0?rik=7fkA4FhB0QWV8g&pid=ImgRaw&r=0",
          linkImage2:
            data[1] ||
            "https://th.bing.com/th/id/R.dac6ac7b9b93ade37f386b44c27fa8e0?rik=7fkA4FhB0QWV8g&pid=ImgRaw&r=0",
          linkImage3:
            data[2] ||
            "https://th.bing.com/th/id/R.dac6ac7b9b93ade37f386b44c27fa8e0?rik=7fkA4FhB0QWV8g&pid=ImgRaw&r=0",
          linkImage4:
            data[3] ||
            "https://th.bing.com/th/id/R.dac6ac7b9b93ade37f386b44c27fa8e0?rik=7fkA4FhB0QWV8g&pid=ImgRaw&r=0",
          linkImage5:
            data[4] ||
            "https://th.bing.com/th/id/R.dac6ac7b9b93ade37f386b44c27fa8e0?rik=7fkA4FhB0QWV8g&pid=ImgRaw&r=0",
        };
        const result = await roomServices.CreateRoom(newDataRoom);
        if (!result) {
          res.status(401).send("fail create");
        }
        res.status(201).send("Create ok");
      } catch (error) {
        res.send(error);
      }
    }
  )
  .delete(
    "/remove/:id",
    AuthorLogin,
    checkRolesUsers,
    checkStatusUsers,
    async (req: Request, res: Response) => {
      try {
        const id = Number(req.params.id);
        const result = await roomServices.removeRoom(id);
        res.status(204).json(result);
      } catch (error) {
        res.json("error delete");
      }
    }
  )
  .patch(
    "/update/:id",
    AuthorLogin,
    checkRolesUsers,
    checkStatusUsers,
    async (req: Request, res: Response) => {
      try {
        const id = Number(req.params.id);
        const newData = {
          ...req.body,
        };
        const result = await roomServices.updateRoom(id, newData);
        res.json(result);
      } catch (error) {
        res.json(error);
      }
    }
  )
  .patch(
    "/upload-room/:id",
    AuthorLogin,
    checkRolesUsers,
    checkStatusUsers,
    uploadCloud.single("file"),
    async (req: Request, res: Response) => {
      try {
        const id = Number(req.params.id);
        const avatar: any = req?.file?.path;
        const key = req.query.dataKey;
        const newData = { [`${key}`]: avatar };
        const result = await roomServices.uploadRoom(newData, id);
        res.status(201).json(result);
      } catch (error) {
        res.status(404).json(error);
      }
    }
  );
export default roomController;
