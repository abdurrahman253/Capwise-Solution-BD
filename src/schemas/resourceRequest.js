import { z } from "zod";

export const resourceRequestSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(80),
  email: z.string().trim().email("Please enter a valid email address.").max(160),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  resourceSlug: z.string().trim().min(2).max(160),
  resourceTitle: z.string().trim().min(2).max(180),
  consent: z.literal(true, {
    error: "Consent is required before we can record your interest.",
  }),
  website: z.string().trim().max(200).optional().or(z.literal("")),
  startedAt: z.coerce.number().int().positive(),
});
