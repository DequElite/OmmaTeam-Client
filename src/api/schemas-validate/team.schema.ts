import { z } from "zod";
import { emailField, usernameField } from "./global.schemas";

export const CreateTeamSchema = z.object({
    name: usernameField
});

// export const SomeTeamByID = z.object({
//     id: z.string().uuid()
// });

// export const ChangeTeamName = z.object({
//     name: usernameField
// });

// export const InviteTeammate = z.object({
//     teamId: z.string().uuid(),
//     email: emailField
// });
