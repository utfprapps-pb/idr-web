import { z } from 'zod'

import { optionSchema } from '@/core/validation/schemas'

export const forageAvailabilityFormSchema = z.object({
  date: z.date({
    required_error: 'A data é obrigatória',
    invalid_type_error: 'Data inválida',
  }),
  forage: optionSchema.refine((value) => value !== null, {
    message: 'A forragem é obrigatória',
  }),
  entranceCm: z.string().min(1, 'A entrada é obrigatória'),
  residueCm: z.string().min(1, 'O resíduo é obrigatório'),
  kgPerSquareMeter: z.string().min(1, 'O kg/m2 é obrigatório'),
  paddockArea: z.string().min(1, 'A área de piquete é obrigatória'),
  efficiencyPercent: z.string().min(1, 'A eficiência é obrigatória'),
  numberOfCows: z.string().min(1, 'O número de vacas é obrigatória'),
})

export type ForageAvailabilityFormSchema = z.infer<
  typeof forageAvailabilityFormSchema
>
