import { apiFetch } from "../client";
import { EmailSubmissionPayload, EmailSubmissionResponse } from "../types";

export const newsletterService = {
  subscribeNewsletter: (payload: EmailSubmissionPayload) =>
    apiFetch<EmailSubmissionResponse>("email-submission", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};
