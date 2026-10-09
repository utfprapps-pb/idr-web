export type AnimalPurchaseDetailsModel = {
  date: Date
  birthDate: Date
  weight: string
  price: string
}

export type AnimalPurchaseDetailsApiResponse = {
  date: string
  birthDate: string
  weight: string
  price: string
}

export type AnimalPurchaseModel = {
  id: string
  date: Date
  birthDate: Date
  weight: string
  price: string
}

// todo: refactor to be consistent with Api response
export type AnimalPurchaseApiResponse = {
  id: string
  date: string
  birthDate: string
  weight: string
  price: string
}
