import { NextFunction, Response, Request } from "express";
import User from "../entities/user.table";

const checkIdUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const result = await User.findOne({ where: { id } });
    if (!result) {
      return res.status(404).json("user not found");
    }
    next();
  } catch (error) {
    res.status(400).json({ msg: "error" });
  }
};

export default checkIdUsers;
