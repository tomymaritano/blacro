// lib/schemas/contactSchema.ts
import { z } from "zod";
import { FORM } from "@/constants/design-tokens";

export const contactSchema = z.object({
  name: z.string().min(FORM.VALIDATION.NAME_MIN, "Tu nombre es muy corto").max(FORM.VALIDATION.NAME_MAX, "El nombre es muy largo"),
  email: z.string().email("Email inválido").max(FORM.VALIDATION.EMAIL_MAX, "El email es muy largo"),
  company: z.string().min(FORM.VALIDATION.COMPANY_MIN, "El nombre de la compañía es muy corto").max(FORM.VALIDATION.COMPANY_MAX, "El nombre de la compañía es muy largo"),
  websiteSocial: z.string().max(FORM.VALIDATION.WEBSITE_MAX, "Website/Social media es muy largo").optional(),
  phone: z.string().min(FORM.VALIDATION.PHONE_MIN, "El número de teléfono es muy corto").max(FORM.VALIDATION.PHONE_MAX, "El número de teléfono es muy largo"),
  country: z.string().min(FORM.VALIDATION.COUNTRY_MIN, "Por favor selecciona un país").max(FORM.VALIDATION.COUNTRY_MAX, "El nombre del país es muy largo"),
  projectDescription: z.string().min(FORM.VALIDATION.PROJECT_DESC_MIN, "Por favor proporciona más detalles sobre tu proyecto").max(FORM.VALIDATION.PROJECT_DESC_MAX, "La descripción del proyecto es muy larga"),
});

export type ContactSchema = z.infer<typeof contactSchema>;