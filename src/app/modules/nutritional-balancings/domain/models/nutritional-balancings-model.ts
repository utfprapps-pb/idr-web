import type { WithId } from '@/core/domain/types'

type NutritionalBalancingEvaluationStatus = 'ABOVE' | 'BELOW' | 'NORMAL'

type NutritionalBalancingIngredientCategory =
  | 'FORAGE'
  | 'CONCENTRATE'
  | 'MINERAL'

type NutritionalBalancingAnimal = {
  name: string
  breed: string
  ecc: string
  weight: string
  milkProduction: string
  estimatedMilkProduction: string
}

type NutritionalBalancingSummary = {
  totalDryMatter: string
  etherExtractPercent: string
  forageDryMatterPercent: string
  concentrateDryMatterPercent: string
  nonFibrousCarbohydratesPercent: string
  rdpTdnRatio: string
}

type NutritionalEvaluation = {
  nutrientName: string
  requiredValue: string
  providedValue: string
  evaluationStatus: NutritionalBalancingEvaluationStatus
}

type IngredientItem = {
  name: string
  quantity: string
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
  weight: string
  milkProduction: string
  estimatedMilkProduction: string
}>

export type NutritionalBalancingApiResponse = WithId<{
  date: string
  animal: string
  breed: string
  weight: string
  milkProduction: string
  estimatedMilkProduction: string
}>
