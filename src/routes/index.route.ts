import { Router } from "express";
import commentRouter from "./v1/comment.route.ts";
import postRouter from "./v1/post.route.ts";
import authRouter from "./v1/auth.route.ts";

const indexRouter = Router();

indexRouter.use("/comments", commentRouter);
indexRouter.use("/posts", postRouter);
indexRouter.use("/auth", authRouter);

export default indexRouter;
