import type { Option, WithId } from '../shared/types'

type PerennialForageType = 'OWNED_LAND' | 'LEASED_LAND'

type PerennialForageDetailsModel = {
  cultivation: Option
  area: string
  averageCost: string
  usefulLife: string
  formation: Date
  type: PerennialForageType
  observation?: string
}

type PerennialForageModel = WithId<{
  cultivation: string
  area: string
  averageCost: string
  usefulLife: string
  formation: string
  type: PerennialForageType
  observation?: string
}>

export type {
  PerennialForageDetailsModel,
  PerennialForageModel,
  PerennialForageType,
}
