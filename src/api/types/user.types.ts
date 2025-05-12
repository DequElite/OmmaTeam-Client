import { z } from "zod";
import { logInSchema, signUpSchema } from "../schemas-validate/register.schema";

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

export interface ChangeProfileDto {
	username: string;
	email: string;
	oldPassword: string;
	password: string;
}

export type TPasswordChangeDto = Partial<
	Pick<ChangeProfileDto, 'email' | 'username'>
> &
	Required<Omit<ChangeProfileDto, 'email' | 'username'>>;

export type TPartialChangeDto = Partial<
	Omit<ChangeProfileDto, 'oldPassword' | 'password'>
>;