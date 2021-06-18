import cron from "node-cron";
import { Secret } from "../models";
import moment from "moment";

async function ExpireSecrets(): Promise<void> {
  await Secret.deleteMany({
    expirationDate: moment().toDate(),
  });
}

const SecretCron = cron.schedule(
  "0 0 0 * * *",
  async () => {
    await ExpireSecrets();
  },
  { scheduled: false }
);

export { SecretCron };
