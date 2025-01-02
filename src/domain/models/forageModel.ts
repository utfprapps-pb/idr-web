import type { Option, WithId } from '../shared/types'

type ForageOwnershipType = 'OWNED_LAND' | 'LEASED_LAND'

type ForageGrowthCycle = 'ANNUAL' | 'PERENNIAL'

type ForageDetailsModel = {
  cultivation: Option
  area: string
  averageCost: string
  usefulLife: string
  formation: Date
  ownershipType: ForageOwnershipType
  growthCycle: ForageGrowthCycle
  observation?: string
}

type ForageModel = WithId<{
  cultivation: string
  area: string
  averageCost: string
  usefulLife: string
  formation: string
  ownershipType: ForageOwnershipType
  growthCycle: ForageGrowthCycle
  observation?: string
}>

export type {
  ForageDetailsModel,
  ForageModel,
  ForageOwnershipType,
  ForageGrowthCycle,
}
