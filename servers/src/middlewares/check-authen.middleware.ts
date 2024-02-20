import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
const AuthorLogin = (req: any, res: Response, next: NextFunction) => {
  try {
    const dataHeader = req.header("Authorization");
    if (!dataHeader) {
      res.status(401).json("Not Login");
      return;
    }
    const tokenUser: any = dataHeader?.split(" ");
    if (tokenUser?.length !== 2 || tokenUser[0] !== "Bearer") {
      res.status(401).json("not login");
      return;
    }
    jwt.verify(tokenUser[1], "secret", (err: any, user: any) => {
      if (err) {
        res.status(401).json("Token is not valid");
        return;
      }
      req.user = user;
      next();
    });
  } catch (error) {
    throw error;
  }
};
export default AuthorLogin;
