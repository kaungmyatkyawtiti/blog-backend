import { Router } from "express";
import * as notiController from "../../controllers/noti.controller.ts"

import authMiddleware from "../../middlewares/auth.middleware.ts";

const notiRouter = Router();

notiRouter.get('/', authMiddleware, notiController.handleGetAllNotis);
notiRouter.put('/read', authMiddleware, notiController.handleReadAllNotis);
notiRouter.put('/read/:id', authMiddleware, notiController.handleReadNotiById);

export default notiRouter;
