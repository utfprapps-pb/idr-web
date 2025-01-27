import type { WithId } from '../shared/types'

type MachineDetailsModel = {
  name: string
  amount: string
  unitPrice: string
  percentDairyCattle: string
  usefulLife: string
  acquisitionDate: Date
  moneyDairyCattle: string
}

type MachineModel = WithId<{
  name: string
  amount: string
  unitPrice: string
  percentDairyCattle: string
  usefulLife: string
  acquisitionDate: string
  moneyDairyCattle: string
}>

export type { MachineDetailsModel, MachineModel }
