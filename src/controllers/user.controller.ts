import type { NextFunction, Request, Response } from "express"
import * as userService from "../services/user.service.ts"

export async function handleGetAllUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await userService.getAllProfiles();

    res.status(200).json({
      success: true,
      message: "Suceessfully fetch all profiles",
      data: users
    });
  } catch (err) {
    console.error('Get profile error:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch all profiles'
    });
  }
}

export async function handleGetUserById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: "followingId is required",
      })
    }

    const user = await userService.getUserById(+id);

    res.status(200).json({
      success: true,
      message: "Suceessfully fetch user by Id",
      data: user
    });
  } catch (err) {
    console.error('Get profile error:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch user by Id'
    });
  }
}

export async function handleFollowUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: "followingId is required",
      })
    }

    const user = req.user;

    const data = await userService.followUser(user?.userId, +id);

    res.status(201).json({
      success: true,
      message: "Suceessfully follow user",
      data
    });
  } catch (err) {
    next(err)
  }
}

export async function handleUnfollowUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: "followingId is required",
      })
    }

    const user = req.user;

    await userService.unfollowUser(user?.id, +id)

    res.status(200).json({
      success: true,
      message: `Suceessfully unfollow user ${id}`,
    });
  } catch (err) {
    next(err)
  }
}

export async function handleSearchUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { q } = req.query;

    if (typeof q !== "string") {
      return res.status(400).json({
        success: false,
        message: 'Query parameter "q" is required',
      });
    }

    const data = await userService.searchUser(q)

    res.status(200).json({
      success: true,
      message: "Searching users success",
      data
    });
  } catch (err) {
    next(err)
  }
}
