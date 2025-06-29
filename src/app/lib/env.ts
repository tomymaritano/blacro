import { z } from 'zod';

const envSchema = z.object({
  SMTP_HOST: z.string().min(1, 'SMTP_HOST is required'),
  SMTP_PORT: z.string().regex(/^\d+$/, 'SMTP_PORT must be a number'),
  SMTP_SECURE: z.string().optional().default('false'),
  SMTP_USER: z.string().email('SMTP_USER must be a valid email'),
  SMTP_PASSWORD: z.string().min(1, 'SMTP_PASSWORD is required'),
});

export function validateEnv() {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.errors
        .map((err) => `${err.path.join('.')}: ${err.message}`)
        .join(', ');
      throw new Error(`Environment validation failed: ${errorMessage}`);
    }
    throw error;
  }
}

export type Env = z.infer<typeof envSchema>;