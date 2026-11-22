import { z } from 'zod'

/**
 * `product.value` vazio = produto não cadastrado: aí o nome digitado é
 * obrigatório. Do catálogo, nome e princípio ativo vêm do próprio produto.
 */
export const animalMedicationFormSchema = z
  .object({
    date: z.date().max(new Date(), { message: 'Data inválida' }),
    product: z.object({
      label: z.string(),
      value: z.string(),
      extraData: z.object({ activePrinciple: z.string() }).optional(),
    }),
    productName: z.string(),
    activePrinciple: z.string(),
    appliedDose: z.string().min(1, { message: 'Campo obrigatório' }),
    applicationMethod: z.enum(['IM', 'IV', 'SC', 'IntraMammary', 'PourOn'], {
      message: 'Campo obrigatório',
    }),
  })
  .superRefine(({ product, productName }, ctx) => {
    if (product.value === '' && productName.trim() === '') {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['productName'],
        message: 'Nome do produto é obrigatório',
      })
    }
  })

export type AnimalMedicationFormSchema = z.infer<
  typeof animalMedicationFormSchema
>
