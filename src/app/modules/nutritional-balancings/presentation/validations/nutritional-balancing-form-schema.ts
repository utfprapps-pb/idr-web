import { array, z } from 'zod'

import { onlyNumbersMask } from '@/core/masker'
import { optionSchema } from '@/core/validation/schemas'

const nutritionalBalancingAnimalSchema = z.object({
  id: z.number().min(1, { message: 'Animal é obrigatório' }),
  name: z.string().min(1, { message: 'Nome do animal é obrigatório' }),
  breed: z.string(),
  ecc: z.string(),
  weight: z.string(),
  milkProduction: z.string(),
  estimatedMilkProduction: z.string(),
})

const nutritionalBalancingSummarySchema = z.object({
  totalDryMatter: z.string(),
  etherExtractPercent: z.string(),
  forageDryMatterPercent: z.string(),
  concentrateDryMatterPercent: z.string(),
  nonFibrousCarbohydratesPercent: z.string(),
  rdpTdnRatio: z.string(),
})

const nutritionalEvaluationSchema = z.object({
  nutrientName: z.string(),
  requiredValue: z.string(),
  providedValue: z.string().optional(),
  evaluationStatus: z.enum(['ABOVE', 'BELOW', 'NORMAL']).optional(),
})

const nutritionalCompositionSchema = z.object({
  type: z.enum(['FORAGE', 'CONCENTRATE', 'MINERAL']),
  crudeProtein: z.number().optional(),
  totalDigestibleNutrients: z.number().optional(),
  dryMatter: z.number().optional(),
  calcium: z.number().optional(),
  phosphorus: z.number().optional(),
  nonFibrousCarbohydrates: z.number().optional(),
  etherExtract: z.number().optional(),
  rumenDegradableProtein: z.number().optional(),
})

export const ingredientItemSchema = z.object({
  ingredient: optionSchema
    .extend({
      extraData: nutritionalCompositionSchema.optional(),
    })
    .refine((val) => val.value > 0, {
      message: 'Ingrediente é obrigatório',
    }),
  quantity: z
    .string()
    .min(1, { message: 'Quantidade do ingrediente é obrigatória' })
    .refine((val) => Number(onlyNumbersMask(val)) > 0, {
      message: 'Quantidade deve ser maior que zero',
    }),
  type: z.enum(['FORAGE', 'CONCENTRATE', 'MINERAL'], {
    errorMap: () => ({ message: 'Categoria inválida' }),
  }),
})

const ingredientGroupSchema = z.object({
  category: z.enum(['FORAGE', 'CONCENTRATE', 'MINERAL'], {
    errorMap: () => ({ message: 'Categoria inválida' }),
  }),
  ingredients: array(ingredientItemSchema).default([]),
})

const nutritionalBalancingSchema = z.object({
  animal: nutritionalBalancingAnimalSchema,
  summary: nutritionalBalancingSummarySchema.optional(),
  evaluations: z
    .array(nutritionalEvaluationSchema)
    .min(1, { message: 'Adicione ao menos uma avaliação' }),
  ingredientGroups: z.array(ingredientGroupSchema).default([]),
})

const nutritionalBalancingsSchema = z.array(nutritionalBalancingSchema).min(1, {
  message: 'Adicione ao menos um balanceamento nutricional para um animal',
})

export const nutritionalBalancingFormSchema = z.object({
  date: z.date().refine(
    (date) => {
      const today = new Date()
      today.setHours(23, 59, 59, 999)
      return date <= today
    },
    { message: 'A data não pode ser maior que a data atual' }
  ),
  visitId: z.number().min(1, { message: 'Visita é obrigatória' }).optional(),
  nutritionalBalancings: nutritionalBalancingsSchema,
})

export type NutritionalBalancingFormSchema = z.infer<
  typeof nutritionalBalancingFormSchema
>

export type NutritionalBalancingSchema = z.infer<
  typeof nutritionalBalancingSchema
>

export type NutritionalBalancingEvaluationSchema = z.infer<
  typeof nutritionalEvaluationSchema
>

export type IngredientItemSchema = z.infer<typeof ingredientItemSchema>

export type IngredientGroupSchema = z.infer<typeof ingredientGroupSchema>
