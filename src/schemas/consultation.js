import { z } from "zod";

export const consultationServices = [
  "Company Formation",
  "Tax & VAT",
  "Accounting & Bookkeeping",
  "Payroll & HR",
  "Corporate Secretarial",
  "Legal & Regulatory Advisory",
  "Business Advisory",
  "Foreign Investment",
  "Other",
];

const optionalShortText = z
  .string()
  .trim()
  .max(120, "Please keep this under 120 characters.")
  .optional()
  .or(z.literal(""));

export const consultationSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name.")
    .max(80, "Please keep your name under 80 characters."),
  email: z
    .string()
    .trim()
    .email("Please enter a valid email address.")
    .max(160, "Please keep your email under 160 characters."),
  phone: optionalShortText,
  company: optionalShortText,
  service: z.enum(consultationServices, {
    error: "Please select the service area closest to your need.",
  }),
  message: z
    .string()
    .trim()
    .min(20, "Please add a little more detail so the team can prepare.")
    .max(3000, "Please keep the briefing under 3,000 characters."),
  consent: z.literal(true, {
    error: "Consent is required before the enquiry can be submitted.",
  }),
  capwiseFormCheck: z.string().trim().max(200).optional().or(z.literal("")),
  startedAt: z.coerce.number().int().positive(),
  sourcePath: z.string().trim().max(240).optional().or(z.literal("")),
});
