import { handleResponse } from "../../utils/handleResponse.util";
import { validateSchemas } from "../../utils/validate.util";
import registerClient from "../clients/register-service.client";
import { changeProfileDataSchema, newPasswordSchema } from "../schemas-validate/profile.schema";
import { ChangeProfileData, NewPassword } from "../types/user.types";

export class ProfileService {
    public async changePassword(body: NewPassword){
        validateSchemas(newPasswordSchema, body);
        return handleResponse(registerClient.patch('/auth/profile/change-password', body));
    }

    public async changeProfile(body: ChangeProfileData){
        validateSchemas(changeProfileDataSchema, body);
        return handleResponse(registerClient.patch('/auth/profile/change-profile', body));
    }

    public async getProfile(){
        return handleResponse(registerClient.get('/auth/profile'));
    }

    public async getUserTeams(){
        return handleResponse(registerClient.get('/auth/profile/teams'));
    }

    public async logOut(){
        return handleResponse(registerClient.post('/auth/profile/logout'));
    }
}