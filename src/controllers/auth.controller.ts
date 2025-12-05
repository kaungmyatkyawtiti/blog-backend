import type { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"
import { accessExpiresIn, accessSecret, nodeEnv, refreshExpiresIn, refreshSecret } from "../utils/ev.ts";
import bcrypt from "bcrypt"
import * as authService from "../services/auth.service.ts"
import type { UserPayload } from "../middlewares/auth.middleware.ts";

const generateTokens = (userId: number, username: string) => {
  const accessToken = jwt.sign(
    { userId, username },
    accessSecret,
    { expiresIn: accessExpiresIn }
  );

  const refreshToken = jwt.sign(
    { userId, username },
    refreshSecret,
    { expiresIn: refreshExpiresIn }
  );

  return { accessToken, refreshToken };
};

export async function handleRegister(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const {
      username,
      name,
      password,
      confirmPassword,
    } = req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        error: "Passwords do not match"
      });
    }

    const existingUser = await authService.findUserByUsername(username);

    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: "User already existed"
      });
    }

    const user = await authService.createUser(username, name, password);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: {
        id: user.id,
        name: user.name,
        username: user.username
      }
    })
  } catch (err) {
    console.error("Register error:", err);
    return res.status(500).json({
      success: false,
      error: "Registration failed",
    });
  }
}

export async function handleLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username, password } = req.body;

    const user = await authService.findUserByUsername(username);

    const isValid =
      user && await bcrypt.compare(password, user.password);

    if (!isValid) {
      return res.status(401).json({
        success: false,
        error: "Invalid credentials"
      });
    }

    const { accessToken, refreshToken } = generateTokens(user.id, user.username);
    console.log("AccessToken:", accessToken);
    console.log("RefreshToken:", refreshToken);

    await authService.saveRefreshToken(user.id, refreshToken)

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: nodeEnv === "production",
      maxAge: 24 * 60 * 60 * 1000,  // 24 hours
      sameSite: "lax" // or "strict"
    });

    return res.json({
      success: true,
      message: 'Login successful',
      data: {
        user: {
          id: user.id,
          name: user.name,
          username: user.username,
        },
        accessToken: accessToken,
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({
      success: false,
      error: 'Login failed'
    });
  }
}

export async function handleRefreshAccessToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        error: 'Refresh token required',
        code: 'NO_REFRESH_TOKEN'
      });
    }

    const decoded = jwt.verify(
      refreshToken,
      refreshSecret
    ) as UserPayload;

    const user = await authService.findUserById(decoded.userId)

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({
        success: false,
        error: 'Invalid refresh token',
        code: 'INVALID_REFRESH_TOKEN'
      });
    }

    const newAccessToken = jwt.sign(
      { userId: user.id, username: user.username },
      accessSecret,
      { expiresIn: accessExpiresIn }
    );

    return res.json({
      success: true,
      message: 'Access token refreshed',
      data: newAccessToken
    });
  } catch (err) {
    console.error('Refresh token error:', err);
    return res.status(500).json({
      success: false,
      error: 'Token refresh failed'
    });
  }
}

export async function handleGetAllProfiles(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await authService.getAllProfiles();

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

export async function handleGetProfileById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        error: 'UserId is required'
      });
    }

    const user = await authService.getProfileById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      message: "Suceessfully fetch profile by Id",
      data: user
    });
  } catch (err) {
    console.error('Get profile by Id error:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to fetch profile by Id'
    });
  }
}

// export async function handleLogout(req: Request, res: Response, next: NextFunction) {
//   try {
//     refreshTokens = refreshTokens.filter(token => token !== req.body["token"]);
//     res.sendStatus(204);
//   } catch (err) {
//     next(err);
//   }
// }
