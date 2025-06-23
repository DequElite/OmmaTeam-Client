import { z } from "zod";
import { AcceptInvitationSchema, ChangeTeamNameSchema, CreateTeamSchema, DeleteTeammateSchema, InviteTeammate, SomeTeamByID } from "../schemas-validate/team.schema";

export interface TeammateDataType {
    id: string;
    userId: string | null;
    inviteToken: string | null;
    inviteExpiresAt: Date | null;
    isAccepted: boolean;
    teamId: string;
}

export interface TeamShortDataType {
    team: {
        id: string;
        name: string;
        leader: {
            email: string;
        };
    };
    assigned_tasks: {
        id: string;
    }[];
}

export interface TeamDataType {
    name: string;
    id: string;
    leaderId: string;
    createdAt: Date;
    isLeader: string;
    teammates: TeammateDataType[];
}

export type ChangeTeamNameType = z.infer<typeof ChangeTeamNameSchema>;
export type CreateTeamType = z.infer<typeof CreateTeamSchema>;
export type SomeTeamByID = z.infer<typeof SomeTeamByID>

export type DeleteTeammateType = z.infer<typeof DeleteTeammateSchema>;
export type InviteTeammateType = z.infer<typeof InviteTeammate>;
export type AcceptInvitationType = z.infer<typeof AcceptInvitationSchema>;