import type { WithId } from '../shared/types/withId'

type PerennialForageDetailsModel = {
  description: string
  area: string
  averageCost: string
  usefulLife: string
  formation: Date
  type: string
  observation: string
}

type PerennialForageModel = WithId<{
  description: string
  area: string
  averageCost: string
  usefulLife: string
  formation: string
  type: string
  observation: string
}>

export type { PerennialForageDetailsModel, PerennialForageModel }
