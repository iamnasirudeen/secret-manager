import mongoose, { Schema } from "mongoose";
import { ISecret } from "../interfaces/secret.interface";
const secretSchema = new Schema(
  {
    identifier: String,
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    secret: {
      iv: String,
      encryptedData: String,
    },
    expirationDate: Date,
  },
  { timestamps: true }
);
const Secret = mongoose.model<ISecret>("Secret", secretSchema);

export { Secret };
