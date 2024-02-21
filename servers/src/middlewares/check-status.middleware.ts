import { NextFunction, Response } from "express";
const checkStatusUsers = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user?.status == 1) {
      next();
    } else {
      res.status(403).json("Không có quyền truy cập");
      return;
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

export default checkStatusUsers;
