import { z } from "zod";
import { emailField, passwordField, usernameField } from "./global.schemas";

export const newPasswordSchema = z.object({
    oldPassword: passwordField,
    password: passwordField
});

export const changeProfileDataSchema= z.object({
    username: usernameField,
    email: emailField
});