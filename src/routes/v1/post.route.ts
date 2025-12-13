import { Router } from "express";
import * as postController from "../../controllers/post.controller.ts"
import authMiddleware from "../../middlewares/auth.middleware.ts";
import { isOwner } from "../../middlewares/isOwer.middleware.ts";
import { validate } from "../../middlewares/validate.ts";
import { postSchema } from "../../validations/app.validation.ts";

const postRouter = Router();

postRouter.get("/posts", postController.handleGetAllPosts);
postRouter.get("/posts/:id", postController.handleGetPostById);

postRouter.post("/posts", authMiddleware, validate(postSchema), postController.handleCreatePost);
postRouter.delete("/posts/:id", authMiddleware, isOwner("post"), postController.handleDeletePost);

postRouter.post("/like/posts/:id", authMiddleware, postController.handleLikePost);
postRouter.delete("/unlike/posts/:id", authMiddleware, postController.handleUnlikePost);

postRouter.get("/likes/posts/:id", postController.handleGetPostAllLikes);

export default postRouter;
