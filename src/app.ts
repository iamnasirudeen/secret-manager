"use strict";

/**
 * Bootstraps the express server loading all hooks, routes and middlewares
 */

import express from "express";
import initRoutes from "./routes";
import initializeMiddlewares from "./middlewares";

const app = express();

// Initialize global middlewares
initializeMiddlewares(app);

// Initialize application routes
initRoutes(app);

export default app;
