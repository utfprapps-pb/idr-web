export type AnimalInseminationDetailsModel = {
  date: Date
  sire: string
}

/** Formato real da API (`GetInseminationByIdOutput` = `ListInseminationOutput`), usado no GET e em cada item da busca. */
export type AnimalInseminationApiResponse = {
  id: string
  animalId: string
  iaDate: string
  bull: string
}

export type AnimalInseminationModel = {
  id: string
  date: Date
  sire: string
}
