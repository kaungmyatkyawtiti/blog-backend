import { Router } from "express";
import * as postController from "../../controllers/post.controller.ts"
import authMiddleware from "../../middlewares/auth.middleware.ts";

const postRouter = Router();

postRouter.get("/", authMiddleware, postController.handleGetAllPosts);
postRouter.get("/:id", authMiddleware, postController.handleGetPostById);
postRouter.delete("/:id", authMiddleware, postController.handleDeletePost);

export default postRouter;
