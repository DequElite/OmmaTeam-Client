export enum UsersRoles {
	User = 'USER',
	Admin = 'ADMIN',
};

export interface SignUp {
    email: string;
    username: string;
    password: string;
    role?: UsersRoles;
}

export interface LogIn {
    email: string;
    password: string;
}


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