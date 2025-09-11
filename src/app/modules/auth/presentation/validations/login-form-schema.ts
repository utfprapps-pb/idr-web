import { z } from 'zod'

export const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Informe um email válido'),
  password: z.string().min(1, 'Senha é obrigatório'),
})

export type LoginFormSchema = z.infer<typeof loginFormSchema>
