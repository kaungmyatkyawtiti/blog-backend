import type { NextFunction, Request, Response } from "express"
import * as commentService from "../services/comment.service.ts";

export async function handleGetAllcomments(req: Request, res: Response, next: NextFunction) {
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

export async function handleDeleteComment(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: "Comment Id is required"
      });
    }

    await commentService.deleteComment(id);

    res.status(200).json({
      success: true,
      message: "Suceessfully deleted comment"
    });
  } catch (err) {
    next(err);
  }
};
