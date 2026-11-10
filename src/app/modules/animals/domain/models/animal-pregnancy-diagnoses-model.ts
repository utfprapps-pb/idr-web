export type AnimalPregnancyDiagnosisDetailsModel = {
  date: Date
  lastInseminationDate: Date
}

/** Formato real da API (`GetPregnancyDiagnoseByIdOutput` = `ListPregnancyDiagnoseOutput`), usado no GET e em cada item da busca. */
export type AnimalPregnancyDiagnosisApiResponse = {
  id: string
  animalId: string
  diagnoseDate: string
  lastIa: string
}

export type AnimalPregnancyDiagnosisModel = {
  id: string
  date: Date
  lastInseminationDate: Date
}
