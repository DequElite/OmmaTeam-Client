import { handleResponse } from "../../utils/handleResponse.util";
import { validateSchemas } from "../../utils/validate.util";
import moderationClient from "../clients/moderation-service.client";
import { CreateFeedbackSchema } from "../schemas-validate/moderation.schemas";
import { CreateFeedbackType } from "../types/moderation.types";

export class ModerationService {
    public async createFeedback(body:CreateFeedbackType) {
        validateSchemas(CreateFeedbackSchema, body);
        return handleResponse(moderationClient.post('/feedback/create', body));
    }

    public async getPositiveFeedbacks() {
        return handleResponse(moderationClient.get('/feedback/positive'))
    }
}