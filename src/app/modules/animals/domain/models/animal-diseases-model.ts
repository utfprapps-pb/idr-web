export type AnimalDiseaseDetailsModel = {
  diagnosticDate: Date
  diagnostic: string
}

/** Formato real da API (`GetAnimalDiseasesByIdOutput` = `ListAnimalDiseasesOutput`), usado no GET e em cada item da busca. */
export type AnimalDiseaseApiResponse = {
  id: string
  animalId: string
  diagnosis: string
  diagnosisDate: string
}

export type AnimalDiseaseModel = {
  id: string
  diagnosticDate: Date
  diagnostic: string
}
