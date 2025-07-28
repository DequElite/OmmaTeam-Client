import { z } from "zod";
import { CreateFeedbackSchema } from "../schemas-validate/moderation.schemas";
import { User } from "./user.types";

export const FeedbackRates = {
  EXCELLENT: "EXCELLENT",
  AVERAGE: "AVERAGE",
  BAD: "BAD",
} as const;
export type FeedbackRates = typeof FeedbackRates[keyof typeof FeedbackRates];

export type CreateFeedbackType = z.infer<typeof CreateFeedbackSchema>;

export interface Feedback {
  createdAt: Date;
  desc: string;
  id: string;
  rate: FeedbackRates;
  user: User;
}