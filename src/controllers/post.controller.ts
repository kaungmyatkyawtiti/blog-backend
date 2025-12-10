import type { NextFunction, Request, Response } from "express"
import * as postService from "../services/post.service.ts";

export async function handleGetAllPosts(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.log("request user", req.user);
    console.log("Cookies received by backend:", req.cookies);
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

export async function handleGetPostById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: "Post Id is required"
      });
    }

    const post = await postService.getPostById(+id);

    res.status(200).json({
      success: true,
      message: "Successfully get post by Id",
      data: post
    });
  } catch (err) {
    next(err);
  }
}

export async function handleCreatePost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { content } = req.body;

    const user = req.user;

    const post = await postService.createPost(content, +user?.userId);

    res.status(201).json({
      success: true,
      message: "Suceessfully created post",
      data: post
    });
  } catch (err) {
    next(err);
  }
};

export async function handleDeletePost(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: "PostId is required"
      });
    }

    await postService.deletePost(+id);

    res.status(200).json({
      success: true,
      message: "Suceessfully deleted post"
    });
  } catch (err) {
    next(err);
  }
};

export async function handleLikePost(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: "PostId is required"
      });
    }

    const user = req.user;

    const like = await postService.likePost(+id, user?.userId)

    res.status(201).json({
      success: true,
      message: "Suceessfully liked the post",
      data: like
    });
  } catch (err) {
    next(err);
  }
}

export async function handleUnlikePost(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: "PostId is required"
      });
    }

    const user = req.user;

    await postService.unlikePost(+id, user?.userId)

    res.status(200).json({
      success: true,
      message: "Suceessfully unliked the post",
    });
  } catch (err) {
    next(err);
  }
}

export async function handleGetPostAllLikes(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: "PostId is required"
      });
    }

    const data = await postService.getPostAllLikes(+id)

    res.status(200).json({
      success: true,
      message: "Suceessfully fetch all post likes",
      data
    });
  } catch (err) {
    next(err);
  }
}
