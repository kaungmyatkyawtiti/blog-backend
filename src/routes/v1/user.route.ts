import { Router } from "express";
import * as userController from "../../controllers/user.controller.ts"
import authMiddleware from "../../middlewares/auth.middleware.ts";

const userRouter = Router();

userRouter.get('/', userController.handleGetAllUsers);
userRouter.get('/:id', userController.handleGetUserById);
userRouter.get('/search', userController.handleSearchUser);

userRouter.post('/follow/:id', authMiddleware, userController.handleFollowUser);
userRouter.delete('/unfollow/:id', authMiddleware, userController.handleUnfollowUser);

export default userRouter;
