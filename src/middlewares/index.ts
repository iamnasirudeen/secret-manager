import logger from "morgan";
import express, { Application } from "express";

const middlewares = [
  logger("dev"),
  express.json({ limit: "10mb" }),
  express.urlencoded({ extended: false, limit: "10mb" }),
];

const init = (app: Application) => {
  for (let middleware in middlewares) app.use(middlewares[middleware]);
};

export default init;
