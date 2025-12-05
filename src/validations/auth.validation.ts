import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string({ message: "Username is required" })
    .min(2, { message: "Username must be at least 2 characters" }),
  name: z
    .string({ message: "Name is required" })
    .min(2, { message: "Name must be at least 2 characters" }),
  password: z
    .string({ message: "Password is required" })
    .min(2, { message: "Password must be at least 2 characters" }),
  confirmPassword: z
    .string({ message: "Confirm password is required" })
    .min(2, { message: "Confirm password must be at least 2 characters" }),
}).required();

export const loginSchema = z.object({
  username: z
    .string({ message: "Username is required" })
    .min(2, { message: "Username must be at least 2 characters" }),
  password: z
    .string({ message: "Password is required" })
    .min(2, { message: "Password must be at least 2 characters" }),
}).required();
