import { z } from 'zod'

export const recoveryCodeFormSchema = z.object({
  recoveryCode: z.string().min(1, 'Código é obrigatório'),
})

export const resetPasswordFormSchema = z
  .object({
    newPassword: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
    confirmPassword: z.string().min(1, 'Confirmação de senha é obrigatória'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

export type RecoveryCodeFormSchema = z.infer<typeof recoveryCodeFormSchema>
export type ResetPasswordFormSchema = z.infer<typeof resetPasswordFormSchema>
