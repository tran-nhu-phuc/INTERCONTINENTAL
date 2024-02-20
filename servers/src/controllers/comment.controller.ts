import express, { Request, Response } from "express";
import CommentService from "../services/comment.services";
import checkRolesUsers from "../middlewares/check-role-user.middleware";
import AuthorLogin from "../middlewares/check-authen.middleware";
const commentController = express.Router();
const commentServices = new CommentService();
commentController
  .get("/get-all-comment/:idRoom", async (req: Request, res: Response) => {
    try {
      const idRoom = Number(req.params.idRoom);
      const sort = req.query.sort || undefined;
      const limit = Number(req.query.limit) || 7;
      const page = Number(req.query.page) || 1;
      const result = await commentServices.getAllByRoom(
        sort,
        limit,
        page,
        idRoom
      );
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  })
  .post(
    "/add-comment",
    AuthorLogin,
    checkRolesUsers,
    async (req: Request, res: Response) => {
      try {
        const newData = {
          content: req.body.content,
          userId: req.body.userId,
          roomId: req.body.roomId,
        };
        const result = await commentServices.createComment(newData);
        res.json(result);
      } catch (error) {
        res.json(error);
      }
    }
  )
  .patch(
    "/update-comment/:id",
    AuthorLogin,
    checkRolesUsers,
    async (req: Request, res: Response) => {
      try {
        const id = Number(req.params.id);
        const newData = {
          ...req.body,
        };
        const result = await commentServices.updateComment(id, newData);
        res.json(result);
      } catch (error) {
        res.json(error);
      }
    }
  )
  .delete(
    "/remove-comment/:id",
    AuthorLogin,
    checkRolesUsers,
    async (req: Request, res: Response) => {
      try {
        const id = Number(req.params.id);
        const result: any = await commentServices.removeComment(id);
        if (result[0] === 0) {
          res.status(404).json(0);
        } else {
          res.status(204).json(1);
        }
      } catch (error) {
        res.json(error);
      }
    }
  );
export default commentController;
