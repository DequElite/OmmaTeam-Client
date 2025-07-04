import { handleResponse } from "../../utils/handleResponse.util";
import { validateSchemas } from "../../utils/validate.util";
import teamClient from "../clients/team-service.client";
import { AcceptInvitationSchema, ChangeTeamNameSchema, CreateTeamSchema, DeleteTeammateSchema, InviteTeammate, SomeTeamByID } from "../schemas-validate/team.schema";
import { AcceptInvitationType, ChangeTeamNameType, CreateTeamType, DeleteTeammateType, InviteTeammateType, type SomeTeamByID as SomeTeamByIDType } from "../types/team.types";

export class TeamService {
    public async changeTeamName(body: ChangeTeamNameType) {
        validateSchemas(ChangeTeamNameSchema, body);
        return handleResponse(teamClient.patch(`/team/change/name/${body.teamId}`, {name:body.name}));
    }

    public async deleteTeam(params: SomeTeamByIDType){
        validateSchemas(SomeTeamByID, params);
        return handleResponse(teamClient.delete(`/team/${params.id}`))
    }

    public async createTeam(body: CreateTeamType) {
        validateSchemas(CreateTeamSchema, body);
        return handleResponse(teamClient.post('/team', body));
    }

    public async getTeamData(params: SomeTeamByIDType) {
        validateSchemas(SomeTeamByID, params);
        return handleResponse(teamClient.get(`/team/${params.id}`));
    }

    public async deleteTeammate(body: DeleteTeammateType){
        validateSchemas(DeleteTeammateSchema, body);
        return handleResponse(teamClient.post(`/teammates/delete/${body.teamId}`, body))
    }

    public async inviteTeammate(body: InviteTeammateType){
        validateSchemas(InviteTeammate, body);
        return handleResponse(teamClient.post(`/teammates/invite/${body.teamId}`, body))
    }

    public async acceptInvitation(body: AcceptInvitationType){
        validateSchemas(AcceptInvitationSchema, body);
        return handleResponse(teamClient.post('/teammates/acceptinvitation', body));
    }

    public async getTeammatesData(params: SomeTeamByIDType){
        validateSchemas(SomeTeamByID, params);
        return handleResponse(teamClient.get(`/teammates/${params.id}`));
    }
}    