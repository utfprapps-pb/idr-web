import { array, z } from 'zod'

import { optionSchema } from '@/core/validation/schemas'

const nutritionalBalancingAnimalSchema = z.object({
  id: z.number().min(1, { message: 'Animal é obrigatório' }),
  name: z.string().min(1, { message: 'Nome do animal é obrigatório' }),
  breed: optionSchema.refine(({ label, value }) => label !== '' && value > 0, {
    message: 'Raça é obrigatória',
  }),
  ecc: z.string().min(1, { message: 'ECC é obrigatório' }),
  weight: z.string().min(1, { message: 'Peso é obrigatório' }),
  milkProduction: z
    .string()
    .min(1, { message: 'Produção de leite é obrigatória' }),
  estimatedMilkProduction: z
    .string()
    .min(1, { message: 'Produção de leite estimada é obrigatória' }),
})

const nutritionalBalancingSummarySchema = z.object({
  totalDryMatter: z
    .string()
    .min(1, { message: 'Matéria seca total é obrigatória' }),
  etherExtractPercent: z
    .string()
    .min(1, { message: 'Extrato etéreo é obrigatório' }),
  forageDryMatterPercent: z
    .string()
    .min(1, { message: 'Matéria seca de forragem é obrigatória' }),
  concentrateDryMatterPercent: z
    .string()
    .min(1, { message: 'Matéria seca de concentrado é obrigatória' }),
  nonFibrousCarbohydratesPercent: z
    .string()
    .min(1, { message: 'Carboidratos não fibrosos são obrigatórios' }),
  rdpTdnRatio: z.string().min(1, { message: 'RDP/TDN é obrigatório' }),
})

const nutritionalEvaluationSchema = z.object({
  nutrientName: z
    .string()
    .min(1, { message: 'Nome do nutriente é obrigatório' }),
  requiredValue: z
    .string()
    .min(1, { message: 'Valor requerido é obrigatório' }),
  providedValue: z
    .string()
    .min(1, { message: 'Valor fornecido é obrigatório' }),
  evaluationStatus: z.enum(['ABOVE', 'BELOW', 'NORMAL'], {
    errorMap: () => ({ message: 'Status inválido' }),
  }),
})

const ingredientItemSchema = z.object({
  name: z.string().min(1, { message: 'Nome do ingrediente é obrigatório' }),
  quantity: z
    .string()
    .min(1, { message: 'Quantidade do ingrediente é obrigatória' }),
})

const ingredientGroupSchema = z.object({
  category: z.enum(['FORAGE', 'CONCENTRATE', 'MINERAL'], {
    errorMap: () => ({ message: 'Categoria inválida' }),
  }),
  ingredients: array(ingredientItemSchema).min(1, {
    message: 'Adicione ao menos um ingrediente',
  }),
})

export const nutritionalBalancingFormSchema = z.object({
  date: z
    .date()
    .max(new Date(), { message: 'A data deve ser menor que a data atual' }),
  animal: nutritionalBalancingAnimalSchema,
  summary: nutritionalBalancingSummarySchema,
  evaluations: z
    .array(nutritionalEvaluationSchema)
    .min(1, { message: 'Adicione ao menos uma avaliação' }),
  ingredientGroups: z
    .array(ingredientGroupSchema)
    .min(1, { message: 'Adicione ao menos um grupo de ingredientes' }),
})

export type NutritionalBalancingFormSchema = z.infer<
  typeof nutritionalBalancingFormSchema
>
