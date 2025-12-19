import type { NextFunction, Request, Response } from "express"
import * as commentService from "../services/comment.service.ts";
import { addNoti } from "../services/noti.service.ts";

export async function handleGetAllcomments(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const comments = await commentService.getAllComments();

    res.status(200).json({
      success: true,
      message: "Suceessfully get all comments",
      data: comments
    });
  } catch (err) {
    next(err);
  }
}

export async function handleCreateComment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { content, postId } = req.body;

    const user = req.user;

    const comment = await commentService.createComment(content, +user?.userId, +postId,);

    await addNoti({
      type: "comment",
      content: "reply your post",
      postId,
      userId: user?.userId,
    });

    res.status(201).json({
      success: true,
      message: "Suceessfully created comment",
      data: comment
    });
  } catch (err) {
    next(err);
  }
};

export async function handleDeleteComment(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: "Comment Id is required"
      });
    }

    await commentService.deleteComment(+id);

    res.status(200).json({
      success: true,
      message: "Suceessfully deleted comment"
    });
  } catch (err) {
    next(err);
  }
};

export async function handleLikeComment(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: "commentId is required"
      });
    }

    const user = req.user;

    const like = await commentService.likeComment(+id, user?.userId)
    console.log("like in handleLikeComment", like);

    const postId = await commentService.getPostId(+id);
    console.log("postId", postId);

    await addNoti({
      type: "like",
      content: "likes your comment",
      postId,
      userId: user?.userId,
    });

    res.status(201).json({
      success: true,
      message: "Suceessfully liked the comment",
      data: like
    });
  } catch (err) {
    next(err);
  }
};

export async function handleUnlikeComment(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: "commentId is required"
      });
    }

    const user = req.user;

    await commentService.unlikeComment(+id, user?.userId)

    res.status(200).json({
      success: true,
      message: "Suceessfully unliked the comment",
    });
  } catch (err) {
    next(err);
  }
}

export async function handleGetCommentAllLikes(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: "commentId is required"
      });
    }

    const data = await commentService.getCommentAllLikes(+id)

    res.status(200).json({
      success: true,
      message: "Suceessfully fetch all comment likes",
      data
    });
  } catch (err) {
    next(err);
  }
}
