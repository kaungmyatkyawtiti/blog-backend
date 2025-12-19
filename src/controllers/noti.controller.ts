import type { NextFunction, Request, Response } from "express"
import * as notiService from "../services/noti.service.ts";

export async function handleGetAllNotis(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user;
    console.log("user", user);
    const notis = await notiService.getAllNotis(+user?.userId);

    res.status(200).json({
      success: true,
      message: "Suceessfully fetch all notis",
      data: notis
    });
  } catch (err) {
    next(err);
  }
}

export async function handleReadAllNotis(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = req.user;
    await notiService.readAllNotis(+user?.userId);

    res.status(200).json({
      success: true,
      msg: "Marked all notis read",
    })
  } catch (err) {
    next(err);
  }
}

export async function handleReadNotiById(
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

    const noti = await notiService.readNotiById(+id);

    res.status(200).json({
      success: true,
      msg: "Marked noti read by Id",
      data: noti
    })
  } catch (err) {
    next(err);
  }
}
