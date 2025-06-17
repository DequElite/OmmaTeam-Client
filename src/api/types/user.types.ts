import { z } from "zod";
import { ForgotPassowrdSchema, logInSchema, ResetPassowrdSchema, signUpSchema } from "../schemas-validate/register.schema";
import { changeProfileDataSchema, newPasswordSchema } from "../schemas-validate/profile.schema";

export enum UsersRoles {
	User = 'USER',
	Admin = 'ADMIN',
};

export interface UserProfileResponse {
	username: string;
    email: string;
    role: UsersRoles;
}

export interface AdditionalUserData {
	id: string;
    refresh_token: string | null;
    is_email_verified: boolean | null;
    email_verification_token: string | null;
    password_reset_token: string | null;
    password_reset_expires_at: Date | null;
    userId: string;
}

export interface User {
	id: string;
    email: string;
  	username: string;
    password: string;
    createdAt: Date;
    role: UsersRoles;
	additional_data?: AdditionalUserData;
}

export type SignUp = z.infer<typeof signUpSchema>;
export type LogIn = z.infer<typeof logInSchema>;

export type ForgotPassowrd = z.infer<typeof ForgotPassowrdSchema>;
export type ResetPasswordShared = z.infer<typeof ResetPassowrdSchema> & {
	resetToken:string;
};
export type ResetPassword = z.infer<typeof ResetPassowrdSchema>;

export type NewPassword = z.infer<typeof newPasswordSchema>;
export type ChangeProfileData = z.infer<typeof changeProfileDataSchema>;