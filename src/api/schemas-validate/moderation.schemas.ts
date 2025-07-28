import { z } from "zod";
import { FeedbackRates } from "../types/moderation.types";

export const CreateFeedbackSchema = z.object({
    rate: z.enum(Object.values(FeedbackRates) as [FeedbackRates, ...FeedbackRates[]]),
    desc: z.string().min(3)
});