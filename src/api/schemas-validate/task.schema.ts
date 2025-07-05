import { z } from "zod";
import { TaskLevels, TaskTypes } from "../types/tasks.types";

export const CreateTaskSchema = z.object({
    teammateId: z.string().uuid(),
    title: z.string(),
    deadline: z.string(),
    type: z.enum(Object.values(TaskTypes) as [TaskTypes, ...TaskTypes[]]),
    hardlevel: z.enum(Object.values(TaskLevels) as [TaskLevels, ...TaskLevels[]]),
    description: z.string(),
    teamId: z.string().uuid()
})