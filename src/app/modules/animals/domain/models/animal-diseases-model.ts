import type { WithId } from '@/core/domain/types'

export type AnimalDiseaseDetailsModel = {
  diagnosticDate: Date
  diagnostic: string
}

export type AnimalDiseaseModel = WithId<{
  diagnosticDate: Date
  diagnostic: string
}>
