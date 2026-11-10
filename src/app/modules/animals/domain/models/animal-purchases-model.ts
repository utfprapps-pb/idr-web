export type AnimalPurchaseDetailsModel = {
  date: Date
  birthDate: Date
  weight: string
  price: string
}

/** Formato real da API (`GetAnimalPurchasesByIdOutput` = `ListAnimalPurchasesOutput`), usado no GET e em cada item da busca. */
export type AnimalPurchaseApiResponse = {
  id: string
  animalId: string
  datePurchase: string
  birthDate: string
  value: number
  weight: number | null
}

export type AnimalPurchaseModel = {
  id: string
  date: Date
  birthDate: Date
  weight: string
  price: string
}
