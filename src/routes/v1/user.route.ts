import { Router } from "express";
import * as userController from "../../controllers/user.controller.ts"
import authMiddleware from "../../middlewares/auth.middleware.ts";

const userRouter = Router();

userRouter.get('/', authMiddleware, userController.handleGetAllUsers);

userRouter.post('/follow/:id', authMiddleware, userController.handleFollowUser);
userRouter.delete('/unfollow/:id', authMiddleware, userController.handleUnfollowUser);

export default userRouter;
