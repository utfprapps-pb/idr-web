export type AnimalSaleReason = 'VOLUNTARY' | 'DISCARD' | 'EMERGENCY'

export type AnimalSaleDestination = 'SLAUGHTER' | 'PRODUCTION'

export type AnimalSaleDetailsModel = {
  date: Date | null
  reason: AnimalSaleReason
  weight: string
  price: string
  destination: AnimalSaleDestination
}

/** Formato real da API (`GetAnimalSalesByIdOutput` = `ListAnimalSalesOutput`), usado no GET e em cada item da busca. */
export type AnimalSaleApiResponse = {
  id: string
  animalId: string
  dateSale: string | null
  reason: string
  value: number
  destination: string
  weight: number | null
}

export type AnimalSaleModel = {
  id: string
  date: Date | null
  reason: string
  weight: string
  price: string
  destination: string
}
