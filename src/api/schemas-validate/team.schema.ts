import { z } from "zod";
import { emailField, usernameField } from "./global.schemas";

export const CreateTeamSchema = z.object({
    name: usernameField
});

export const SomeTeamByID = z.object({
    id: z.string().uuid()
});

export const ChangeTeamNameSchema = z.object({
    name: usernameField,
    teamId: z.string().uuid(),
});

export const DeleteTeammateSchema = z.object({
    teamId: z.string().uuid(),
    teammateEmail:emailField,
})

export const InviteTeammate = z.object({
    teamId: z.string().uuid(),
    email: emailField
});

export const AcceptInvitationSchema = z.object({
    email: emailField,
    inviteToken: z.string().uuid(),
})