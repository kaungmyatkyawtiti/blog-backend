import { Router } from "express";
import * as postController from "../../controllers/post.controller.ts"
import authMiddleware from "../../middlewares/auth.middleware.ts";
import { isOwner } from "../../middlewares/isOwer.middleware.ts";
import { validate } from "../../middlewares/validate.ts";
import { postSchema } from "../../validations/app.validation.ts";

const postRouter = Router();

postRouter.get("/", postController.handleGetAllPosts);
postRouter.get("/:id", postController.handleGetPostById);

postRouter.post("/", authMiddleware, validate(postSchema), postController.handleCreatePost);
postRouter.delete("/:id", authMiddleware, isOwner("post"), postController.handleDeletePost);

postRouter.post("/like/:id", authMiddleware, postController.handleLikePost);
postRouter.delete("/unlike/:id", authMiddleware, postController.handleUnlikePost);

postRouter.get("/likes/:id", postController.handleGetPostAllLikes);

export default postRouter;
