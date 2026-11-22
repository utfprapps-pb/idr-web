export type AnimalDiseaseDetailsModel = {
  diagnosticDate: Date | null
  diagnostic: string
}

/** Formato real da API (`GetAnimalDiseasesByIdOutput` = `ListAnimalDiseasesOutput`), usado no GET e em cada item da busca. */
export type AnimalDiseaseApiResponse = {
  id: string
  animalId: string
  diagnosis: string
  diagnosisDate: string | null
}

export type AnimalDiseaseModel = {
  id: string
  diagnosticDate: Date | null
  diagnostic: string
}
