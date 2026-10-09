export type AnimalDiseaseDetailsModel = {
  diagnosticDate: Date
  diagnostic: string
}

export type AnimalDiseaseDetailsApiResponse = {
  diagnosisDate: string
  diagnosis: string
}

export type AnimalDiseaseModel = {
  id: string
  diagnosticDate: Date
  diagnostic: string
}

// todo: refactor to be consistent with Api response
export type AnimalDiseaseApiResponse = {
  id: string
  diagnosticDate: string
  diagnostic: string
}
