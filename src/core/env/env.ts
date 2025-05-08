import { z } from 'zod'

const envSchema = z.object({
  VITE_API_BASE_URL: z.string().url(),
  VITE_API_MOCKED: z.enum(['true', 'false']).transform((val) => val === 'true'),
})

export const env = envSchema.parse(import.meta.env)
