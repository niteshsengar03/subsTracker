import { Router } from "express";
import { signIn, signOut, signUp } from "../controllers/auth.controller";

const authRouter = Router();

// api: /api/v1/auth/
authRouter.post('/sign-up',signUp);
authRouter.post('/sign-in',signIn);
authRouter.post('/sign-out',signOut);

export default authRouter;
