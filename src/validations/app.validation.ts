import { z } from "zod";

export const commentSchema = z.object({
  content: z
    .string({ message: "Content is required" }),
  postId: z
    .number({ message: "PostId is required" })
}).required();

export const postSchema = z.object({
  content: z
    .string({ message: "Content is required" }),
}).required();
