import { apiFetch } from "../client";
import { ContactFormPayload, ContactFormResponse } from "../types";

export const contactService = {
  submitContactForm: (payload: ContactFormPayload) =>
    apiFetch<ContactFormResponse>("contact-form", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
};
