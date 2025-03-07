import type { WithId } from '@/core/domain/types'

export type MachineDetailsModel = {
  name: string
  amount: string
  unitPrice: string
  percentDairyCattle: string
  usefulLife: string
  acquisitionDate: Date
  moneyDairyCattle: string
}

export type MachineModel = WithId<{
  name: string
  amount: string
  unitPrice: string
  percentDairyCattle: string
  usefulLife: string
  acquisitionDate: string
  moneyDairyCattle: string
}>
