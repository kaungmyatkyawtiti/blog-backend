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
