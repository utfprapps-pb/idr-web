import type { Option, WithId } from '@/core/domain/types'

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
  providedValue?: string
  evaluationStatus?: NutritionalBalancingEvaluationStatus
}

type IngredientItem = {
  ingredient: Option
  quantity: string
}

type IngredientGroup = {
  category: NutritionalBalancingIngredientCategory
  ingredients: IngredientItem[]
}

export type NutritionalBalancingDetailsModel = {
  date: Date
  visitId?: number
  animal: WithId<NutritionalBalancingAnimal>
  summary?: NutritionalBalancingSummary
  evaluations: NutritionalEvaluation[]
  ingredientGroups: IngredientGroup[]
}

export type NutritionalBalancingDetailsApiResponse = {
  date: string
  visitId: number
  animal: WithId<NutritionalBalancingAnimal>
  summary?: NutritionalBalancingSummary
  evaluations: NutritionalEvaluation[]
  ingredientGroups: IngredientGroup[]
}

export type NutritionalBalancingModel = WithId<{
  date: Date
  visitId: number
  animal: string
  breed: string
  weight: number
  milkProduction: number
  estimatedMilkProduction: number
}>

export type NutritionalBalancingApiResponse = WithId<{
  date: string
  visitId: number
  animal: string
  breed: string
  weight: number
  milkProduction: number
  estimatedMilkProduction: number
}>
