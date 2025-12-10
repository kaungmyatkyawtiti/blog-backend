import type { NextFunction, Request, Response } from "express"
import { getPost } from "../services/post.service.ts";
import { getCommentById } from "../services/comment.service.ts";

type OwnerCheckType = "post" | "comment";

export function isOwner(type: OwnerCheckType) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: "Id is required"
      })
    }

    const user = req.user;
    console.log(req.user)

    if (type == "post") {
      const post = await getPost(+id);

      if (!post) {
        return res.status(404).json({
          success: false,
          error: "Comment not found"
        });
      }

      if (post.userId === user?.userId) return next();
    }

    if (type == "comment") {
      const comment = await getCommentById(+id);

      if (!comment) {
        return res.status(404).json({
          success: false,
          error: "Comment not found"
        });
      }

      if (
        comment.userId === user?.userId ||
        comment.post.userId === user?.userId
      ) return next()
    }

    return res.status(403).json({
      success: false,
      error: "Unauthorized to delete"
    });
  };
}
