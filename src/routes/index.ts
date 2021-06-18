import { Application, Router } from "express";
import AuthRoute from "./auth.route";
import SecretRoute from "./secret.router";

const getRoutes = (app: Application) => {
  const routes: Array<Router> = [AuthRoute, SecretRoute];
  routes.map((route) => app.use(route));
};

export default getRoutes;
