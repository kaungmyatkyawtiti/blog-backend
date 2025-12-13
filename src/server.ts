import express from "express";
import cors from "cors";
import { serverPort } from "./utils/ev.ts";
import prisma from "./lib/prismaClient.ts";
import cookieParser from "cookie-parser";
import authRouter from "./routes/v1/auth.route.ts";
import userRouter from "./routes/v1/user.route.ts";
import commentRouter from "./routes/v1/comment.route.ts";
import postRouter from "./routes/v1/post.route.ts";

const app = express();

app.use(express.json());
// app.use(cors());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(cookieParser());

// routes
app.use("/api", commentRouter);
app.use("/api", postRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

const server = app.listen(serverPort, () => {
  console.log(`Server running on ${serverPort}!`);
})

const gracefulShutdown = async () => {
  await prisma.$disconnect();
  server.close(() => {
    console.log("Server closed!");
    process.exit(0);
  });
};

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);
