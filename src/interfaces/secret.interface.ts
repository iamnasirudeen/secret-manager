import { Document, Types } from "mongoose";
import { IUser } from "./user.interface";

interface ISecret extends Document {
  userId: Types.ObjectId | IUser;
  secret: {
    iv: string;
    encryptedData: string;
  };
  expirationDate: Date;
  identifier: String;
}

export { ISecret };
