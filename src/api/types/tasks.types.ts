import { z } from "zod";
import { CreateTaskSchema } from "../schemas-validate/task.schema";

export const TaskTypes = {
  DEFAULT: "DEFAULT",
  SUBTASKS: "SUBTASKS",
} as const;
export type TaskTypes = typeof TaskTypes[keyof typeof TaskTypes];

export const TaskLevels = {
  EASY: "EASY",
  MEDIUM: "MEDIUM",
  HARD: "HARD"
} as const;
export type TaskLevels = typeof TaskLevels[keyof typeof TaskLevels];

export type CreateTaskType = z.infer<typeof CreateTaskSchema>;