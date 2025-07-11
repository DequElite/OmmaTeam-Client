import { handleResponse } from "../../utils/handleResponse.util";
import { validateSchemas } from "../../utils/validate.util";
import taskClient from "../clients/task-service.client";
import { CheckSubTaskSchema, CreateTaskSchema, GetTaskSchema, SomeWithTaskIdSchema } from "../schemas-validate/task.schema";
import { SomeTeamByID } from "../schemas-validate/team.schema";
import { CheckSubTaskType, CreateTaskType, GetTaskType, SomeWithTaskIdType } from "../types/tasks.types";
import { type SomeTeamByID as SomeTeamByIDType } from "../types/team.types";

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

    public async checkSubtask(body: CheckSubTaskType) {
        validateSchemas(CheckSubTaskSchema, body);
        return handleResponse(taskClient.patch(`/task-management/subtask/${body.teamId}`, {taskId: body.taskId, subtaskId: body.subtaskId}));
    }

    public async deleteTask(body: SomeWithTaskIdType){
        validateSchemas(SomeWithTaskIdSchema, body);
        return handleResponse(taskClient.delete(`/task-management/delete/${body.teamId}`, {
            data: { taskId: body.taskId }
        }));
    }

    public async completeTask(body: SomeWithTaskIdType){
        validateSchemas(SomeWithTaskIdSchema, body);
        return handleResponse(taskClient.patch(`/task-management/complete/${body.teamId}`, 
            { taskId: body.taskId }
        ));
    }

    public async getPersonalTeamTasks(body: SomeTeamByIDType) {
        validateSchemas(SomeTeamByID, body);
        return handleResponse(taskClient.get(`/data-management/tasks/personal/${body.id}`));
    }

    public async getAllTeamTask(body: SomeTeamByIDType) {
        validateSchemas(SomeTeamByID, body);
        return handleResponse(taskClient.get(`/data-management/tasks/all/${body.id}`))
    }
}