import { z } from 'zod'

import { notFutureDateValidation } from '@/core/validation/validators'

/** Tamanho das colunas `productName`/`activePrinciple` da medicação na API. */
export const PRODUCT_TEXT_MAX_LENGTH = 255

/**
 * `product.value` vazio = produto não cadastrado: aí o nome digitado é
 * obrigatório. Do catálogo, nome e princípio ativo vêm do próprio produto.
 */
export const animalMedicationFormSchema = z
  .object({
    date: z
      .date()
      .refine(notFutureDateValidation, { message: 'Data inválida' }),
    product: z.object({
      label: z.string(),
      value: z.string(),
      extraData: z.object({ activePrinciple: z.string() }).optional(),
    }),
    productName: z.string().max(PRODUCT_TEXT_MAX_LENGTH, {
      message: `Máximo de ${PRODUCT_TEXT_MAX_LENGTH} caracteres`,
    }),
    activePrinciple: z.string().max(PRODUCT_TEXT_MAX_LENGTH, {
      message: `Máximo de ${PRODUCT_TEXT_MAX_LENGTH} caracteres`,
    }),
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
