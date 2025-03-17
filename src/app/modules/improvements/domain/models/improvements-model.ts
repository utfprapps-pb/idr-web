import type { WithId } from '@/core/domain/types'

export type ImprovementDetailsModel = {
  description: string
  amount: string
  unitPrice: string
  percentDairyCattle: string
  usefulLife: string
  acquisitionDate: Date
  moneyDairyCattle: string
}

export type ImprovementModel = WithId<{
  description: string
  amount: string
  unitPrice: string
  percentDairyCattle: string
  usefulLife: string
  acquisitionDate: string
  moneyDairyCattle: string
}>
