import { useMutation } from "@tanstack/react-query";
import { contactService } from "@/core/api/services/contact";
import { ContactFormPayload, ContactFormResponse } from "@/core/api/types";

export function useContact() {
  return useMutation<ContactFormResponse, Error, ContactFormPayload>({
    mutationKey: ["cms", "contact"],
    mutationFn: (payload: ContactFormPayload) =>
      contactService.submitContactForm(payload),
  });
}
