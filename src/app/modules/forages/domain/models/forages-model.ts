import type { Option, WithId } from '@/core/domain/types'

export type ForageOwnershipType = 'OWNED_LAND' | 'LEASED_LAND'

export type ForageGrowthCycle = 'ANNUAL' | 'PERENNIAL'

export type ForageDetailsModel = {
  cultivation: Option
  area: string
  averageCost: string
  usefulLife: string
  formation: Date
  ownershipType: ForageOwnershipType
  growthCycle: ForageGrowthCycle
  observation?: string
}

export type ForageModel = WithId<{
  cultivation: string
  area: string
  averageCost: string
  usefulLife: string
  formation: string
  ownershipType: ForageOwnershipType
  growthCycle: ForageGrowthCycle
  observation?: string
}>
