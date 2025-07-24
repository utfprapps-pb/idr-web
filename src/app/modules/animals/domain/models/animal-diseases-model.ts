import type { WithId } from '@/core/domain/types'

export type AnimalDiseaseDetailsModel = {
  diagnosticDate: Date
  diagnostic: string
}

export type AnimalDiseasesDetailsApiResponse = {
  diagnosticDate: string
  diagnostic: string
}

export type AnimalDiseaseModel = WithId<{
  diagnosticDate: Date
  diagnostic: string
}>

// todo: refactor to be consistent with Api response
export type AnimalDiseaseApiResponse = WithId<{
  diagnosticDate: string
  diagnostic: string
}>
