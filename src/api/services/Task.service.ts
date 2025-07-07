import { handleResponse } from "../../utils/handleResponse.util";
import { validateSchemas } from "../../utils/validate.util";
import taskClient from "../clients/task-service.client";
import { CreateTaskSchema, GetTaskSchema } from "../schemas-validate/task.schema";
import { CreateTaskType, GetTaskType } from "../types/tasks.types";

export class TaskService{
    public async createTask(body: CreateTaskType) {
        validateSchemas(CreateTaskSchema, body);
        return handleResponse(taskClient.post(`/task-management/create/${body.teamId}`, body));
    }

    public async getTask(body: GetTaskType) {
        validateSchemas(GetTaskSchema, body);
        return handleResponse(taskClient.get(`/data-management/task/${body.teamId}`, {
            params: { taskId: body.taskId }
        }));
    }
}