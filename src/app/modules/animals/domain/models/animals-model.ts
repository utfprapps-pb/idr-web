import type { Option } from '@/core/domain/types'

export type AnimalDetailsModel = {
  name: string
  breed: Option<string>
  weight: string
  ecc: string
  milkProduction: string
}

export type AnimalModel = {
  id: string
  name: string
  breed: string
  weight: string
  ecc: string
  milkProduction: string
}

/** Formato real da API (`GetAnimalByIdOutput` = `ListAnimalOutput`), usado no GET e em cada item da busca. */
export type AnimalApiResponse = {
  id: string
  propertyId: string
  animalMotherId: string | null
  breedId: string
  breedName: string | null
  type: string | null
  identifier: string
  gender: string | null
  bornCondition: string | null
  bornDate: string | null
  bornWeight: number | null
  previousWeight: number | null
  currentWeight: number | null
  ecc: number | null
}

export type AnimalWriteApiRequest = {
  propertyId: string
  identifier: string
  breedId: string
}
