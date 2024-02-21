import { NextFunction, Response, Request } from "express";
import User from "../entities/user.table";

const checkEmailUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = req.body.email;
    const result = await User.findOne({ where: { email } });
    if (!result) {
      return res.status(404).json(1);
    }
    next();
  } catch (error) {
    res.status(400).json(error);
  }
};

export default checkEmailUsers;
