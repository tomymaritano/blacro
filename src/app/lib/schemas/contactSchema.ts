// lib/schemas/contactSchema.ts
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name is too short.").max(100, "Name is too long."),
  email: z.string().email("Invalid email address.").max(255, "Email is too long."),
  message: z.string().min(10, "Message is too short.").max(2000, "Message is too long."),
});

export type ContactSchema = z.infer<typeof contactSchema>;