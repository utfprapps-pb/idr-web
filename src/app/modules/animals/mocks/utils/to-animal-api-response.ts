import allBreedsData from '@database/allBreedsData.json'

import type { AnimalApiResponse } from '../../domain/models/animals-model'

type AnimalSeed = {
  id: string
  identifier: string
  breedId: string
  currentWeight: number | null
  ecc: number | null
}

/** Completa o registro do seed com o formato real da API (`breedName` resolvido pelo catálogo). */
export function toAnimalApiResponse(
  animal: AnimalSeed,
  propertyId: string
): AnimalApiResponse {
  return {
    id: animal.id,
    propertyId,
    animalMotherId: null,
    breedId: animal.breedId,
    breedName:
      allBreedsData.find((breed) => breed.id === animal.breedId)?.breedName ??
      null,
    type: null,
    identifier: animal.identifier,
    gender: null,
    bornCondition: null,
    bornDate: null,
    bornWeight: null,
    previousWeight: null,
    currentWeight: animal.currentWeight,
    ecc: animal.ecc,
  }
}
