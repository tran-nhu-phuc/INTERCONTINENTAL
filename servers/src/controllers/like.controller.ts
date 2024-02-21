import express, { Request, Response } from "express";
import checkRolesUsers from "../middlewares/check-role-user.middleware";
import AuthorLogin from "../middlewares/check-authen.middleware";
import LikeService from "../services/like.services";
import checkStatusUsers from "../middlewares/check-status.middleware";
const likeController = express.Router();
const likeServices = new LikeService();
likeController
  .post(
    "/add-like",
    AuthorLogin,
    checkRolesUsers,
    checkStatusUsers,
    async (req: Request, res: Response) => {
      try {
        const newData = {
          userId: Number(req.body.userId),
          commentId: Number(req.body.commentId),
        };
        const result = await likeServices.addNewLike(newData);
        res.status(201).json(result);
      } catch (error) {
        res.status(404).json(error);
      }
    }
  )
  .delete(
    "/remove-like/:id",
    AuthorLogin,
    checkRolesUsers,
    checkStatusUsers,
    async (req: Request, res: Response) => {
      try {
        const id = Number(req.params.id);
        const result = await likeServices.removeLike(id);
        console.log(result);
      } catch (error) {
        res.status(404).json("not found");
      }
    }
  );
export default likeController;
