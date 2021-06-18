/**
 * Author: Iamnasirudeen
 * Github Repo: https://github.com/iamnasirudeen/express-text-encryptor
 * Last Commit: 17th of May 2019
 */

import crypto from "crypto";
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

const ENCRYPTION_ALGORITHM = "aes-256-cbc";

function encryptSecret(secret: string): { iv: string; encryptedData: string } {
  const cipher = crypto.createCipheriv(
    ENCRYPTION_ALGORITHM,
    Buffer.from(key),
    iv
  );

  let encrypted = cipher.update(secret);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString("hex"), encryptedData: encrypted.toString("hex") };
}

function decryptSecret(encryptedSecret: {
  iv: string;
  encryptedData: string;
}): string {
  const iv = Buffer.from(encryptedSecret.iv, "hex");
  const encryptedText = Buffer.from(encryptedSecret.encryptedData, "hex");
  const decipher = crypto.createDecipheriv(
    ENCRYPTION_ALGORITHM,
    Buffer.from(key),
    iv
  );
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

export { encryptSecret, decryptSecret };
