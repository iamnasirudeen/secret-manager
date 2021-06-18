import { Router } from "express";
import {
  createSecret,
  deleteSecret,
  updateSecret,
  viewSecrets,
  viewSingleSecret,
} from "../controllers/secret.controller";
import { validateAuthToken } from "../middlewares/auth.middleware";
const router = Router();

router.post("/secret/create", validateAuthToken, createSecret);
router.post("/secret/update", validateAuthToken, updateSecret);
router.post("/secret/delete", validateAuthToken, deleteSecret);
router.get("/secrets", validateAuthToken, viewSecrets);
router.get("/secrets/:identifier", validateAuthToken, viewSingleSecret);

export default router;
