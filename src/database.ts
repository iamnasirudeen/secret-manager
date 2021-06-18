import mongoose from "mongoose";
import { Application } from "express";

export default async function (app: Application) {
  const URI = process.env.DB_URI as string;

  mongoose.Promise = global.Promise;
  try {
    const { connection } = await mongoose.connect(URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log(
      `connected to "${connection.name}" database at ${connection.host}:${connection.port}`
    );
    return connection;
  } catch (error) {
    console.log(
      "%s MongoDB connection error. Please make sure MongoDB is running."
    );
    console.log(error);
    process.exit(1);
  }
}
