import { NextFunction, Request, Response } from "express";
import config from "../config";
import jwt, { JwtPayload } from "jsonwebtoken";
const auth = (...role: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split("Bearer ")[1];
      if (!token) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized",
        });
      }
      const decodedToken: any = jwt.verify(token, config.accessTokenSecret as string) as JwtPayload;
      req.user = decodedToken;
      if (role.length && !role.includes(decodedToken.role)) {
        return res.status(403).json({
          success: false,
          message: "Forbidden",
        });
      }
      next()
    } catch (error: any) {
      res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  };
};
export default auth;
