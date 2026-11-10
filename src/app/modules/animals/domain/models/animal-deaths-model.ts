export type AnimalDeathDetailsModel = {
  date: Date
  reason: string
}

/** Formato real da API (`GetAnimalDeathByIdOutput` = `ListAnimalDeathOutput`), usado no GET e em cada item da busca. */
export type AnimalDeathApiResponse = {
  id: string
  animalId: string
  reason: string
  deathDate: string
}

export type AnimalDeathModel = {
  id: string
  date: Date
  reason: string
}
