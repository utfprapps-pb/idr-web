import animalsData from '@database/animalsData.json'

import { findBreedName } from './find-breed-name'

import type { AnimalApiResponse } from '../../domain/models/animals-model'

type AnimalSeed = {
  id: string
  identifier: string
  breedId: string
  type: string | null
  gender: string | null
  bornCondition: string | null
  bornDate: string | null
  bornWeight: number | null
  animalMotherId: string | null
  currentWeight: number | null
  ecc: number | null
}

const IDENTIFIERS = new Map(
  animalsData.map((animal) => [animal.id, animal.identifier])
)

/** Completa o registro do seed com o formato real da API (`breedName` e `animalMotherIdentifier` resolvidos). */
export function toAnimalApiResponse(
  animal: AnimalSeed,
  propertyId: string
): AnimalApiResponse {
  return {
    id: animal.id,
    propertyId,
    animalMotherId: animal.animalMotherId,
    animalMotherIdentifier: animal.animalMotherId
      ? (IDENTIFIERS.get(animal.animalMotherId) ?? null)
      : null,
    breedId: animal.breedId,
    breedName: findBreedName(animal.breedId),
    type: animal.type,
    identifier: animal.identifier,
    gender: animal.gender,
    bornCondition: animal.bornCondition,
    bornDate: animal.bornDate,
    bornWeight: animal.bornWeight,
    previousWeight: null,
    currentWeight: animal.currentWeight,
    ecc: animal.ecc,
  }
}
