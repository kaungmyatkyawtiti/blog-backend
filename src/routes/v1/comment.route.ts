import { Router } from "express";
import * as commentController from "../../controllers/comment.controller.ts"
import authMiddleware from "../../middlewares/auth.middleware.ts";

const commentRouter = Router();

commentRouter.get("/", authMiddleware, commentController.handleGetAllcomments);
commentRouter.delete("/:id", authMiddleware, commentController.handleDeleteComment);

export default commentRouter;
