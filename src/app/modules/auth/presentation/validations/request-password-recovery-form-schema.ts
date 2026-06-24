import { z } from 'zod'

export const requestPasswordRecoveryFormSchema = z.object({
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Informe um email válido'),
})

export type RequestPasswordRecoveryFormSchema = z.infer<
  typeof requestPasswordRecoveryFormSchema
>
