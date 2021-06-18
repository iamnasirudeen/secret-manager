import db from "./database";
import app from "./app";
import * as dotenv from "dotenv";
import { join } from "path";
import { SecretCron } from "./libs";

dotenv.config({ path: join(__dirname, "../.env") });

db(app)
  .then(async () => {
    console.log("Database connection established");
    const port = process.env.PORT;
    app.listen(port);
    SecretCron.start();
  })
  .catch((err) => console.log(err));

export default app;
