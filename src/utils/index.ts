import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { join } from "path";
dotenv.config({ path: join(__dirname, "../../.env") });

const JWT_SECRET = process.env.JWT_SECRET as string;

function comparePassword(user: any, password: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    user.comparePassword(password, async (err: any, isMatch: boolean) => {
      if (isMatch) resolve(true);
      else resolve(false);
    });
  });
}

function signInUser(user: any): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign({ _id: user._id }, JWT_SECRET, (err: any, token: any) => {
      if (err) reject(err);
      resolve(token);
    });
  });
}

export { comparePassword, signInUser };
