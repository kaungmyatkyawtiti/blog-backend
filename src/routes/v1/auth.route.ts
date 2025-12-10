import { Router } from "express";
import * as authController from "../../controllers/auth.controller.ts"
import { validate } from "../../middlewares/validate.ts";
import { loginSchema, registerSchema } from "../../validations/auth.validation.ts";
import authMiddleware from "../../middlewares/auth.middleware.ts";

const authRouter = Router();

authRouter.post('/register', validate(registerSchema), authController.handleRegister);
authRouter.post('/login', validate(loginSchema), authController.handleLogin);
authRouter.post('/refresh', authController.handleRefreshAccessToken);

authRouter.get('/verify', authMiddleware, authController.handleVerifyUser);

export default authRouter;
