import express from "express";
import cors from "cors";
import { serverPort } from "./utils/ev.ts";
import indexRouter from "./routes/index.route.ts";
import prisma from "./lib/prismaClient.ts";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
// app.use(cors());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(cookieParser());

app.use('/api', indexRouter);

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
