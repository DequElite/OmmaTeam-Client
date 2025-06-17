import { handleResponse } from "../../utils/handleResponse.util";
import { validateSchemas } from "../../utils/validate.util";
import teamClient from "../clients/team-service.client";
import { CreateTeamSchema } from "../schemas-validate/team.schema";
import { CreateTeamType } from "../types/team.types";

//todo: дописать все 
export class TeamService {
    public async createTeam(body: CreateTeamType) {
        validateSchemas(CreateTeamSchema, body);
        return handleResponse(teamClient.post('/team', body));
    }
}    