import { findBreedName } from './find-breed-name'

import type {
  AnimalChildbirthApiResponse,
  AnimalChildbirthCondition,
  AnimalChildbirthGender,
} from '../../domain/models/animal-childbirths-model'

type AnimalChildbirthSeed = Omit<
  AnimalChildbirthApiResponse,
  'animalId' | 'gender' | 'condition' | 'breedName' | 'calfIdentifier'
> & { gender: string; condition: string }

/** Completa o seed com o que a API resolve no servidor (`breedName`; sem bezerro vinculado). */
export function toAnimalChildbirthApiResponse(
  childbirth: AnimalChildbirthSeed,
  animalId: string
): AnimalChildbirthApiResponse {
  return {
    ...childbirth,
    animalId,
    gender: childbirth.gender as AnimalChildbirthGender,
    condition: childbirth.condition as AnimalChildbirthCondition,
    breedName: findBreedName(childbirth.breedId),
    calfIdentifier: null,
  }
}
