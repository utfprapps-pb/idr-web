import type { WithId } from '@/core/domain/types'

type NutritionalBalancingEvaluationStatus = 'ABOVE' | 'BELOW' | 'NORMAL'

type NutritionalBalancingIngredientCategory =
  | 'FORAGE'
  | 'CONCENTRATE'
  | 'MINERAL'

type NutritionalBalancingAnimal = {
  name: string
  breed: string
  ecc: number
  weight: number
  milkProduction: number
  estimatedMilkProduction: number
}

type NutritionalBalancingSummary = {
  totalDryMatter: number
  etherExtractPercent: number
  forageDryMatterPercent: number
  concentrateDryMatterPercent: number
  nonFibrousCarbohydratesPercent: number
  rdpTdnRatio: number
}

type NutritionalEvaluation = {
  nutrientName: string
  requiredValue: number
  providedValue: number
  evaluationStatus: NutritionalBalancingEvaluationStatus
}

type IngredientItem = {
  name: string
  quantity: number
}

type IngredientGroup = {
  category: NutritionalBalancingIngredientCategory
  ingredients: WithId<IngredientItem>[]
}

export type NutritionalBalancingDetailsModel = {
  date: Date
  animal: WithId<NutritionalBalancingAnimal>
  summary: NutritionalBalancingSummary
  evaluations: NutritionalEvaluation[]
  ingredientGroups: IngredientGroup[]
}

export type NutritionalBalancingDetailsApiResponse = {
  date: string
  animal: WithId<NutritionalBalancingAnimal>
  summary: NutritionalBalancingSummary
  evaluations: NutritionalEvaluation[]
  ingredientGroups: IngredientGroup[]
}

export type NutritionalBalancingModel = WithId<{
  date: Date
  animal: string
  breed: string
  weight: number
  milkProduction: number
  estimatedMilkProduction: number
}>

export type NutritionalBalancingApiResponse = WithId<{
  date: string
  animal: string
  breed: string
  weight: number
  milkProduction: number
  estimatedMilkProduction: number
}>
