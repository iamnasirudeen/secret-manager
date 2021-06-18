import { Router } from "express";
import { signIn, signUp } from "../controllers";
import { decryptSecret, encryptSecret } from "../libs";
const router = Router();

router.get("/", () => {
  let val = encryptSecret("kayode");
  console.log(val);

  console.log(decryptSecret(val));
});

router.post("/auth/sign-up", signUp);
router.post("/auth/sign-in", signIn);

export default router;
