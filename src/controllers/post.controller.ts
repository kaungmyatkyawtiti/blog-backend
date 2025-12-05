import type { NextFunction, Request, Response } from "express"
import * as postService from "../services/post.service.ts";

export async function handleGetAllPosts(req: Request, res: Response, next: NextFunction) {
  try {
    const posts = await postService.getAllPosts();

    res.status(200).json({
      success: true,
      message: "Successfully get all posts",
      data: posts
    });
  } catch (err) {
    next(err);
  }
}

export async function handleGetPostById(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: "Post Id is required"
      });
    }

    const post = await postService.getPostById(id);

    res.status(200).json({
      success: true,
      message: "Successfully get post by Id",
      data: post
    });
  } catch (err) {
    next(err);
  }
}

export async function handleDeletePost(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: "PostId is required"
      });
    }

    await postService.deletePost(id);

    res.status(200).json({
      success: true,
      message: "Suceessfully deleted post"
    });
  } catch (err) {
    next(err);
  }
};
