import jwt from "jsonwebtoken";
import { IReq } from "../interfaces/req.interface";
import { Response, NextFunction } from "express";
import { User } from "../models";
import * as dotenv from "dotenv";
import { join } from "path";
dotenv.config({ path: join(__dirname, "../../.env") });
const JWT_SECRET = process.env.JWT_SECRET as string;

async function validateAuthToken(req: IReq, res: Response, next: NextFunction) {
  const token = req.headers["authorization"] as string;
  if (!token)
    return res.status(401).send({ status: "error", message: "Unauthorized" });

  if (token) {
    jwt.verify(token, JWT_SECRET, async (err: any, decoded: any) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Token is not valid",
        });
      }

      const user = await User.findById(decoded?._id);
      if (!user)
        return res
          .status(401)
          .send({ status: false, message: "User not found" });

      req.user = {
        id: decoded?._id,
      };

      next();
    });
  } else {
    return res.status(401).send({
      success: false,
      message: "Unauthorized",
    });
  }
}

export { validateAuthToken };
