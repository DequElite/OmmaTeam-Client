import { z } from "zod";
import { UsersRoles } from "../types/user.types";

export const emailField = z.string().email("Incorrect mail format!");

export const usernameField = z
  .string()
  .max(25, "Username must not be longer than 25 characters!")
  .min(6, "The username must contain at least 6 characters!");

export const passwordField = z
  .string()
  .min(8, "The password must contain at least 8 characters!")
  .regex(/[a-z]/, "The password must contain lowercase letters!")
  .regex(/[A-Z]/, "The password must contain uppercase letters!")
  .regex(/[0-9]/, "The password must contain numbers!")
  .regex(/[!@#$%^&*(),.?":{}|<>]/, "The password must contain special characters!")

export const roleField = z.enum(Object.values(UsersRoles) as [UsersRoles, ...UsersRoles[]]);