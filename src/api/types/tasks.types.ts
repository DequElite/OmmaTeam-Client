import { z } from "zod";
import { CheckSubTaskSchema, CreateTaskSchema, GetTaskSchema, SomeWithTaskIdSchema } from "../schemas-validate/task.schema";

export interface TaskType {
  id: string
  title: string
  createdAt: Date
  deadline: Date
  type: TaskTypes
  hardLevel: TaskLevels
  isCompleted: boolean
  description: string | null
  teamId: string
  assignedToId: string
  assignedTo: any
  subtasks: SubtaskType[]
}

export interface TinyTaskType {
  id: string
  title: string
  deadline: Date
  type: TaskTypes
  hardLevel: TaskLevels
  isCompleted: boolean
  teamId: string
}

export interface SubtaskType {
  id: string
  name: string
  status: SubTasksStatus
  taskId: string
}

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

export const SubTasksStatus = {
  IN_THE_PROGRESS: 'IN_THE_PROGRESS',
  COMPLETED: 'COMPLETED'
} as const;
export type SubTasksStatus = typeof SubTasksStatus[keyof typeof SubTasksStatus];

export type CreateTaskType = z.infer<typeof CreateTaskSchema>;

export type GetTaskType = z.infer<typeof GetTaskSchema>;

export type CheckSubTaskType = z.infer<typeof CheckSubTaskSchema>;

export type SomeWithTaskIdType = z.infer<typeof SomeWithTaskIdSchema>;