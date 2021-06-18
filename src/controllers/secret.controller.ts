import { Response } from "express";
import { decryptSecret, encryptSecret } from "../libs";
import { Secret } from "../models";
import { IReq } from "../interfaces/req.interface";
import moment from "moment";
import { randomBytes } from "crypto";

export async function createSecret(req: IReq, res: Response) {
  const { secret } = req.body;

  const { iv, encryptedData } = encryptSecret(secret);
  const identifier = randomBytes(6).toString("hex");

  const payload = {
    identifier,
    secret: {
      iv,
      encryptedData,
    },
    userId: req.user?.id,
    expirationDate: moment().add(1, "year"),
  };

  await Secret.create(payload);

  return res.status(201).send({
    status: "success",
    message: "Secret saved successfully",
    identifier,
  });
}

export async function updateSecret(req: IReq, res: Response) {
  const { identifier, secret } = req.body;

  const secretExist = await Secret.findOne({
    identifier,
    userId: req.user?.id,
  });
  if (!secretExist)
    return res
      .status(401)
      .send({ status: "error", message: "Secret not found" });

  const { iv, encryptedData } = encryptSecret(secret);

  await Secret.updateOne({ identifier, secret: { iv, encryptedData } });

  return res
    .status(200)
    .send({ status: "error", message: "Secret updated successfully" });
}

export async function deleteSecret(req: IReq, res: Response) {
  const { identifier } = req.body;

  await Secret.deleteOne({ identifier, userId: req.user?.id });

  return res
    .status(200)
    .send({ status: "success", message: "Secret deleted successfully" });
}

export async function viewSecrets(req: IReq, res: Response) {
  const secrets = await Secret.find({ userId: req.user?.id });
  const responsePayload = secrets.map((secret) => {
    const secretValue = decryptSecret({
      iv: secret.secret.iv,
      encryptedData: secret.secret.encryptedData,
    });

    return {
      secret: secretValue,
    };
  });

  return res.status(200).send({
    status: "success",
    message: "Fetched secrets successfully",
    record: responsePayload,
  });
}

export async function viewSingleSecret(req: IReq, res: Response) {
  const { identifier } = req.params;

  const secret = await Secret.findOne({ identifier, userId: req.user?.id });
  if (!secret)
    return res
      .status(401)
      .send({ status: "error", message: "Secret not found" });

  const secretValue = decryptSecret({
    iv: secret.secret.iv,
    encryptedData: secret.secret.encryptedData,
  });

  return res.status(200).send({
    status: "success",
    message: "Secret fetched successfully",
    secret: secretValue,
  });
}
