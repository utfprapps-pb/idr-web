import { findBreedName } from './find-breed-name'

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
    breedName: findBreedName(animal.breedId),
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
