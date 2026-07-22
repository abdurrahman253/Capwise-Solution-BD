import { z } from "zod";

export const newsletterSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(80),
  email: z.string().trim().email("Please enter a valid email address.").max(160),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  topics: z
    .array(z.enum(["Tax & VAT", "RJSC & Corporate", "Investment", "Labour & HR"]))
    .min(1, "Choose at least one update topic.")
    .max(4),
  consent: z.literal(true, {
    error: "Consent is required before subscribing.",
  }),
  website: z.string().trim().max(200).optional().or(z.literal("")),
  startedAt: z.coerce.number().int().positive(),
});
