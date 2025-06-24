// lib/schemas/contactSchema.ts
import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Nombre es requerido (mínimo 2 letras)"),
  email: z.string().email("Correo inválido"),
  message: z.string().min(10, "Mensaje debe tener al menos 10 caracteres"),
});

export type ContactSchema = z.infer<typeof contactSchema>;