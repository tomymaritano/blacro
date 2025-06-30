// lib/schemas/contactSchema.ts
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Tu nombre es muy corto").max(100, "El nombre es muy largo"),
  email: z.string().email("Email inválido").max(255, "El email es muy largo"),
  company: z.string().min(2, "El nombre de la compañía es muy corto").max(100, "El nombre de la compañía es muy largo"),
  website: z.string().url("Ingresa una URL válida").optional().or(z.literal("")),
  socialMedia: z.string().max(200, "El usuario de redes sociales es muy largo").optional(),
  phone: z.string().min(10, "El número de teléfono es muy corto").max(20, "El número de teléfono es muy largo"),
  country: z.string().min(2, "Por favor selecciona un país").max(100, "El nombre del país es muy largo"),
  projectDescription: z.string().min(20, "Por favor proporciona más detalles sobre tu proyecto").max(5000, "La descripción del proyecto es muy larga"),
});

export type ContactSchema = z.infer<typeof contactSchema>;