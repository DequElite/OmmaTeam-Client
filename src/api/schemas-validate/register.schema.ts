import { z } from "zod";
import { emailField, passwordField, roleField, usernameField } from "./global.schemas";

export const ForgotPassowrdSchema = z.object({
  email: emailField,
});

export const ResetPassowrdSchema = z.object({
  password: passwordField,
})

export const passwordFieldLogin = z
  .string()
  .min(1, "Password is required!");

export const signUpSchema = z.object({
  email: emailField,
  username: usernameField,
  password: passwordField,
  role: roleField.optional(),
});

export const logInSchema = z.object({
  email: emailField,
  password: passwordFieldLogin,
});
