import { handleResponse } from "../../utils/handleResponse.util";
import { validateSchemas } from "../../utils/validate.util";
import registerClient from "../clients/register-service.client";
import { 
    changeProfileSchema, 
    logInSchema, 
    passwordField, 
    signUpSchema 
} from "../schemas-validate/register.schema";
import { 
    LogIn, 
    SignUp, 
    TPartialChangeDto, 
    TPasswordChangeDto 
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

    public async getProfile(){
        return handleResponse(registerClient.get('/auth/profile'));
    }

    public async changePassword(body: TPasswordChangeDto){
        validateSchemas(passwordField, body.password);
        return handleResponse(registerClient.post('/auth/profile/change-password', body));
    }

    public async changeProfile(body: TPartialChangeDto){
        validateSchemas(changeProfileSchema, body);
        return handleResponse(registerClient.post('/auth/profile/change-profile', body));
    }
}