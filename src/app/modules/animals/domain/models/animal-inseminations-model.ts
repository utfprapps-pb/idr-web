export type AnimalInseminationDetailsModel = {
  date: Date
  sire: string
}

export type AnimalInseminationDetailsApiResponse = {
  iaDate: string
  bull: string
}

export type AnimalInseminationModel = {
  id: string
  date: Date
  sire: string
}

export type AnimalInseminationApiResponse = {
  id: string
  date: string
  sire: string
}
