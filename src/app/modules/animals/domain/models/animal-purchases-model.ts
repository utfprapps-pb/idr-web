export type AnimalPurchaseDetailsModel = {
  date: Date | null
  birthDate: Date | null
  weight: string
  price: string
}

/** Formato real da API (`GetAnimalPurchasesByIdOutput` = `ListAnimalPurchasesOutput`), usado no GET e em cada item da busca. */
export type AnimalPurchaseApiResponse = {
  id: string
  animalId: string
  datePurchase: string | null
  birthDate: string | null
  /** A API aceita nulo; o mapper lê como `''`. */
  value: number | null
  weight: number | null
}

export type AnimalPurchaseModel = {
  id: string
  date: Date | null
  birthDate: Date | null
  weight: string
  price: string
}
