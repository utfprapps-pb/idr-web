export type AnimalPregnancyDiagnosisDetailsModel = {
  date: Date | null
  lastInseminationDate: Date | null
}

/** Formato real da API (`GetPregnancyDiagnoseByIdOutput` = `ListPregnancyDiagnoseOutput`), usado no GET e em cada item da busca. */
export type AnimalPregnancyDiagnosisApiResponse = {
  id: string
  animalId: string
  diagnoseDate: string | null
  lastIa: string | null
}

export type AnimalPregnancyDiagnosisModel = {
  id: string
  date: Date | null
  lastInseminationDate: Date | null
}
