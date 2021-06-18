import { Router } from "express";
import { signIn, signUp } from "../controllers";
const router = Router();

router.post("/auth/sign-up", signUp);
router.post("/auth/sign-in", signIn);

export default router;
