import { z } from 'zod'

import { notFutureDateValidation } from '@/core/validation/validators'

/**
 * Só nome e raça são obrigatórios. Os demais campos aceitam vazio e também
 * valores fora das listas da tela (dados antigos), que são preservados.
 */
export const animalFormSchema = z.object({
  name: z.string().min(1, {
    message: 'Nome é obrigatório',
  }),
  breed: z
    .object({ label: z.string(), value: z.string() })
    .refine(({ label, value }) => label !== '' && value !== '', {
      message: 'Raça é obrigatória',
    }),
  size: z.object({ label: z.string(), value: z.string() }),
  gender: z.string(),
  mother: z.object({ label: z.string(), value: z.string() }),
  bornDate: z
    .date()
    .refine(notFutureDateValidation, { message: 'Data inválida' })
    .nullable(),
  bornWeight: z.string(),
  bornCondition: z.string(),
})

export type AnimalFormSchema = z.infer<typeof animalFormSchema>
