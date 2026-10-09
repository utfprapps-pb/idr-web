export type AnimalSaleReason = 'VOLUNTARY' | 'DISCARD' | 'EMERGENCY'

export type AnimalSaleDestination = 'SLAUGHTER' | 'PRODUCTION'

export type AnimalSaleDetailsModel = {
  date: Date
  reason: AnimalSaleReason
  weight: string
  price: string
  destination: AnimalSaleDestination
}

export type AnimalSaleDetailsApiResponse = {
  date: string
  reason: string
  weight: string
  price: string
  destination: string
}

export type AnimalSaleModel = {
  id: string
  date: Date
  reason: string
  weight: string
  price: string
  destination: string
}

// todo: refactor to be consistent with Api response
export type AnimalSaleApiResponse = {
  id: string
  date: string
  reason: string
  weight: string
  price: string
  destination: string
}
