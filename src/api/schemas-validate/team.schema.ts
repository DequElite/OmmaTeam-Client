import { z } from "zod";
import { usernameField } from "./global.schemas";

export const CreateTeamSchema = z.object({
    name: usernameField
})