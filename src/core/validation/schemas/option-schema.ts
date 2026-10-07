import { z } from 'zod'

export const optionSchema = z.object({
  label: z.string().min(1, { message: 'Campo obrigatório' }),
  value: z.number().min(1, { message: 'Campo obrigatório' }),
})

export const optionStringSchema = z.object({
  label: z.string().min(1, { message: 'Campo obrigatório' }),
  value: z.string().min(1, { message: 'Campo obrigatório' }),
})

export const createOptionSchemaWithExtraData = <T extends z.ZodRawShape>(
  extraDataShape: T
) =>
  optionSchema.extend({
    extraData: z.object(extraDataShape).optional(),
  })
