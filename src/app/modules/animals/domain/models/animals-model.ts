import type { Option } from '@/core/domain/types'

/**
 * Dados editáveis do animal (identificação e nascimento). String vazia,
 * `bornDate: null` e `mother.value === ''` significam "não informado".
 * Peso atual/anterior e ECC não fazem parte: são medidas datadas.
 */
export type AnimalDetailsModel = {
  name: string
  breed: Option<string>
  type: string
  gender: string
  mother: Option<string>
  bornDate: Date | null
  bornWeight: string
  bornCondition: string
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
  animalMotherIdentifier: string | null
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

export type AnimalCreateApiRequest = {
  identifier: string
  breedId: string
  type: string | null
  gender: string | null
  animalMotherId: string | null
  bornDate: string | null
  bornWeight: number | null
  bornCondition: string | null
}

/** Corpo do PUT: substitui a identificação; campo nulo apaga o valor. */
export type AnimalUpdateApiRequest = AnimalCreateApiRequest
