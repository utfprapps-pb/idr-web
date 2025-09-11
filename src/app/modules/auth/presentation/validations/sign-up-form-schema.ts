import { z } from 'zod'

import {
  emailValidation,
  passwordValidation,
  cpfValidation,
  phoneValidation,
  yearValidation,
} from '@/core/validation/validators'

export const signUpFormFirstStepSchema = z
  .object({
    name: z.string().min(1, {
      message: 'Nome é obrigatório',
    }),
    email: z.string().refine(emailValidation, {
      message: 'Email precisa ser válido',
    }),
    password: z.string().refine(passwordValidation, {
      message:
        'O campo precisa ter 8 caracteres, 1 letra maiúscula, 1 letra minúscula, 1 número e 1 símbolo',
    }),
    confirmPassword: z.string(),
    cpf: z.string().refine(cpfValidation, {
      message: 'CPF precisa ser válido',
    }),
    phone: z.string().refine(phoneValidation, {
      message: 'Celular precisa ser válido',
    }),
    graduationYear: z.string().refine(yearValidation, {
      message: 'Ano de graduação precisa ser válido',
    }),
    professionalRegister: z.string().min(1, {
      message: 'Registro profissional é obrigatório',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas precisam ser iguais',
    path: ['confirmPassword'],
  })

export type SignUpFormFirstStepSchema = z.infer<
  typeof signUpFormFirstStepSchema
>

export const signUpFormSecondStepSchema = z.object({
  cep: z.string().min(1, {
    message: 'CEP é obrigatório',
  }),
  street: z.string().min(1, {
    message: 'Rua é obrigatório',
  }),
  city: z.string().min(1, {
    message: 'Cidade é obrigatório',
  }),
  houseNumber: z.string().optional(),
})

export type SignUpFormSecondStepSchema = z.infer<
  typeof signUpFormSecondStepSchema
>
