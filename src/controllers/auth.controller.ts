import { Request, Response } from "express";
import { User } from "../models";
import { comparePassword, signInUser } from "../utils";

export async function signUp(req: Request, res: Response) {
  const { name, email, password } = req.body;
  await User.create({ name, email, password });
  return res
    .status(201)
    .send({ status: "success", message: "User created successfully." });
}

export async function signIn(req: Request, res: Response) {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user)
    return res.status(401).send({
      status: "error",
      message: "Incorrect Email / Password, Pls try again",
    });

  const passwordIsCorrect = await comparePassword(user, password);

  if (passwordIsCorrect) {
    /**
     * Do not pass the user's password to the jwt func
     */
    delete user.password;
    const token = await signInUser(user);

    return res.status(200).send({
      status: "Login Successfull",
      token,
    });
  } else
    return res.status(401).send({
      status: "error",
      message: "Incorrect Email / Password, Pls try again",
    });
}
