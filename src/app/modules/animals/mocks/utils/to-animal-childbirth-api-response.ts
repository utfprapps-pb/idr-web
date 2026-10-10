import { findBreedName } from './find-breed-name'

import type {
  AnimalChildbirthApiResponse,
  AnimalChildbirthCondition,
  AnimalChildbirthGender,
} from '../../domain/models/animal-childbirths-model'

type AnimalChildbirthSeed = {
  id: string
  breedId: string
  gender: string
  weight: number
  condition: string
  date: string
}

/** Completa o registro do seed com o formato real da API (`breedName` resolvido pelo catálogo; sem bezerro vinculado). */
export function toAnimalChildbirthApiResponse(
  childbirth: AnimalChildbirthSeed,
  animalId: string
): AnimalChildbirthApiResponse {
  return {
    id: childbirth.id,
    animalId,
    childbirthDate: childbirth.date,
    gender: childbirth.gender as AnimalChildbirthGender,
    weight: childbirth.weight,
    condition: childbirth.condition as AnimalChildbirthCondition,
    breedId: childbirth.breedId,
    calfId: null,
    breedName: findBreedName(childbirth.breedId),
    calfIdentifier: null,
  }
}
