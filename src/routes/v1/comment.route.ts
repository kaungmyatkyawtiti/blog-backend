import { Router } from "express";
import * as commentController from "../../controllers/comment.controller.ts"
import authMiddleware from "../../middlewares/auth.middleware.ts";
import { isOwner } from "../../middlewares/isOwer.middleware.ts";
import { validate } from "../../middlewares/validate.ts";
import { commentSchema } from "../../validations/app.validation.ts";

const commentRouter = Router();

commentRouter.get("/", commentController.handleGetAllcomments);

commentRouter.post("/", authMiddleware, validate(commentSchema), commentController.handleCreateComment);
commentRouter.delete("/:id", authMiddleware, isOwner("comment"), commentController.handleDeleteComment);

commentRouter.post("/like/:id", authMiddleware, commentController.handleLikeComment);
commentRouter.delete("/unlike/:id", authMiddleware, commentController.handleUnlikeComment);

commentRouter.get("/likes/:id", commentController.handleGetCommentAllLikes);

export default commentRouter;
