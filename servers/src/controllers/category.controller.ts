import express, { Request, Response } from "express";
import CategoryService from "../services/category.services";
import checkRolesUsers from "../middlewares/check-role-user.middleware";
import AuthorLogin from "../middlewares/check-authen.middleware";
const categoryController = express.Router();
const categoryServices = new CategoryService();
categoryController
  .post(
    "/add-category",
    AuthorLogin,
    checkRolesUsers,
    async (req: Request, res: Response) => {
      try {
        const newDataCategory = {
          name: req.body.name,
        };
        const result = await categoryServices.createCategory(newDataCategory);
        res.send(result);
      } catch (error) {
        res.send("duple category name");
      }
    }
  )
  .get("/", async (req: Request, res: Response) => {
    try {
      const result = await categoryServices.getAll();
      res.status(200).json(result);
    } catch (error) {
      res.json(error);
    }
  })
  .delete("/remove-category/:id", async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const result = await categoryServices.removeCategory(id);
      res.status(204).json(result);
    } catch (error) {
      res.status(404).json(error);
    }
  });
export default categoryController;
