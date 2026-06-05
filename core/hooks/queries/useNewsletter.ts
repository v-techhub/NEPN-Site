import { useMutation } from "@tanstack/react-query";
import { newsletterService } from "@/core/api/services/newsletter";
import { EmailSubmissionPayload, EmailSubmissionResponse } from "@/core/api/types";

export function useNewsletter() {
  return useMutation<EmailSubmissionResponse, Error, EmailSubmissionPayload>({
    mutationKey: ["cms", "newsletter"],
    mutationFn: (payload: EmailSubmissionPayload) =>
      newsletterService.subscribeNewsletter(payload),
  });
}
