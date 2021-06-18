import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";
import bcrypt from "bcryptjs";
const userSchema = new Schema(
  {
    name: String,
    email: String,
    password: String,
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  const user: IUser = this;
  const SALT_FACTOR = 12;
  if (!user.isModified("password")) return next();
  const salt = bcrypt.genSaltSync(SALT_FACTOR);
  const hash = bcrypt.hashSync(user?.password as string, salt);
  user.password = hash;
  next();
});

userSchema.methods.comparePassword = function (
  candidatePassword: string,
  cb: Function
) {
  const user: IUser = this;
  bcrypt
    .compare(candidatePassword, user?.password as string)
    .then((isMatch: Boolean) => {
      cb(null, isMatch);
    })
    .catch((err: any) => cb(err));
};

const User = mongoose.model<IUser>("User", userSchema);

export { User };
