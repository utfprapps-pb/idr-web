export type AnimalSaleReason = 'VOLUNTARY' | 'DISCARD' | 'EMERGENCY'

export type AnimalSaleDestination = 'SLAUGHTER' | 'PRODUCTION'

/** `''` em `reason`/`destination`/`price`: a API devolveu nulo (não informado). */
export type AnimalSaleDetailsModel = {
  date: Date | null
  reason: AnimalSaleReason | ''
  weight: string
  price: string
  destination: AnimalSaleDestination | ''
}

/** Formato real da API (`GetAnimalSalesByIdOutput` = `ListAnimalSalesOutput`), usado no GET e em cada item da busca. */
export type AnimalSaleApiResponse = {
  id: string
  animalId: string
  dateSale: string | null
  /** `reason`, `value` e `destination` a API aceita nulos. */
  reason: string | null
  value: number | null
  destination: string | null
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
