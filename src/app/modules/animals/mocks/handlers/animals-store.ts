import animalsData from '@database/animalsData.json'

import { createAnimalMockStore } from '../utils/animal-mock-store'
import { findBreedName } from '../utils/find-breed-name'

import type { AnimalCreateApiRequest } from '../../domain/models/animals-model'

/** Campos que a API exige no animal (`@NotNull`/`@NotBlank` no request): sem eles o mock responde 400. */
export const ANIMAL_REQUIRED_FIELDS: readonly (keyof AnimalCreateApiRequest)[] =
  ['identifier', 'breedId']

export const animalsStore = createAnimalMockStore(animalsData, findBreedName)
