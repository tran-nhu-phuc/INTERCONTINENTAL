import { NextFunction, Response, Request } from "express";
const checkRolesUsers = async (req: any, res: Response, next: NextFunction) => {
  try {
    if (req.user?.role == 1) {
      next();
    } else {
      res.status(403).json("Forbidden");
      return;
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

export default checkRolesUsers;
