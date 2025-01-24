import type { WithId } from '../shared/types'

type ImprovementDetailsModel = {
  description: string
  amount: string
  unitPrice: string
  percentDairyCattle: string
  usefulLife: string
  acquisitionDate: Date
  moneyDairyCattle: string
}

type ImprovementModel = WithId<{
  description: string
  amount: string
  unitPrice: string
  percentDairyCattle: string
  usefulLife: string
  acquisitionDate: string
  moneyDairyCattle: string
}>

export type { ImprovementDetailsModel, ImprovementModel }
