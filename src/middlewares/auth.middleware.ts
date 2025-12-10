import type { NextFunction, Request, Response } from "express"
import { accessSecret } from "../utils/ev.ts";
import jwt from "jsonwebtoken"

export interface UserPayload {
  userId: number;
  username: string;
};

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { accessToken } = req.cookies;
  console.log("accessToken", accessToken);

  if (!accessToken) {
    return res.status(401).json({
      success: false,
      error: "Access token required",
      code: 'NO_ACCESS_TOKEN'
    });
  }

  try {
    const decoded = jwt.verify(
      accessToken,
      accessSecret,
    ) as UserPayload;
    console.log("decoded", decoded);

    req.user = {
      userId: decoded.userId,
      username: decoded.username
    }
    next();
  } catch (error) {
    console.log("Jwt verfiy error:", error)
    return res.status(401).json({
      success: false,
      error: "Access token expired.",
      code: 'ACCESS_TOKEN_EXPIRED'
    })
  }
}
