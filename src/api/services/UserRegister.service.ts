import { handleResponse } from "../../utils/handleResponse.util";
import { validateSchemas } from "../../utils/validate.util";
import registerClient, { BaseRegisterUrl } from "../clients/register-service.client";
import { 
    logInSchema, 
    signUpSchema 
} from "../schemas-validate/register.schema";
import { 
    ForgotPassowrd,
    LogIn, 
    ResetPasswordShared, 
    SignUp, 
    User
} from "../types/user.types";

export class UserService {

    public async signUp(body: SignUp){
        validateSchemas(signUpSchema, body);
        return handleResponse(registerClient.post('/sign/sign-up', body));
    }

    public async logIn(body: LogIn){
        validateSchemas(logInSchema, body);
        return handleResponse(registerClient.post('/sign/log-in', body));
    }

    public async refreshToken(){
        return handleResponse(registerClient.get('/auth/refresh-tokens'));
    }

    public async getAllForTest(){
        return handleResponse(registerClient.get<User[]>('/sign/sign-up/all'))
    }

    public googleSign(): string{
        return `${BaseRegisterUrl}/sign/google-sign`;
    }

    public async forgotPassowrd(body: ForgotPassowrd){
        return handleResponse(registerClient.post('/forgot-password/send-reset-password-key', body));
    }

    public async resetPassoword(body: ResetPasswordShared){
        return handleResponse(registerClient.post('/forgot-password/reset-password', body))
    }
}