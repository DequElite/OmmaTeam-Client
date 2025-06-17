import { z } from "zod";
import { CreateTeamSchema } from "../schemas-validate/team.schema";

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

export type CreateTeamType = z.infer<typeof CreateTeamSchema>