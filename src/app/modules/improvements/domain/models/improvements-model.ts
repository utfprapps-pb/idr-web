import type { WithId } from '@/core/domain/types'

export type ImprovementDetailsModel = {
  type: string
  name: string
  amount: string
  unitPrice: string
  percentDairyCattle: string
  lifespan: string
  acquisitionDate: Date
  moneyDairyCattle: string
}

export type ImprovementDetailsApiResponse = {
  type: string
  name: string
  amount: string
  unitPrice: string
  percentDairyCattle: string
  lifespan: string
  acquisitionDate: string
  moneyDairyCattle: string
}

export type ImprovementModel = WithId<{
  type: string
  name: string
  amount: string
  unitPrice: string
  percentDairyCattle: string
  lifespan: string
  acquisitionDate: string
  moneyDairyCattle: string
}>

export type ImprovementApiResponse = WithId<{
  type: string
  name: string
  amount: number
  unitPrice: number
  percentDairyCattle: number
  lifespan: number
  acquisitionDate: string
  moneyDairyCattle: number
}>
