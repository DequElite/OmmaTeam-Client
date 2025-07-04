import { z } from "zod";
import { SubTasksStatus, TaskLevels, TaskTypes } from "../types/tasks.types";

export const SubtaskSchema = z.object({
    id: z.string().uuid().optional(),
    name: z.string().min(1, 'Subtask name is required'),
    status: z.enum(Object.values(SubTasksStatus) as [SubTasksStatus, ...SubTasksStatus[]]),
    taskId: z.string().uuid().optional(), 
});

export const CreateTaskSchema = z.object({
    teammateId: z.string().uuid(),
    title: z.string().min(3),
    deadline: z.string().min(8),
    type: z.enum(Object.values(TaskTypes) as [TaskTypes, ...TaskTypes[]]),
    hardLevel: z.enum(Object.values(TaskLevels) as [TaskLevels, ...TaskLevels[]]),
    description: z.string().min(3),
    teamId: z.string().uuid(),
    subtasks: z.array(SubtaskSchema).optional()
})