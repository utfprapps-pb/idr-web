import animalChildbirthsData from '@database/animalChildbirthsData.json'

import { createEventMockStore } from '../../utils/event-mock-store'

import type { AnimalChildbirthApiRequest } from '../../../data/mappers/animal-childbirth-api-mapper'
import type { AnimalChildbirthApiResponse } from '../../../domain/models/animal-childbirths-model'

/** Como a API grava; `breedName`/`calfIdentifier` são resolvidos na leitura. */
export type AnimalChildbirthRecord = Omit<
  AnimalChildbirthApiResponse,
  'animalId' | 'breedName' | 'calfIdentifier'
>

/** Campos que `AnimalChildbirthApiRequest` não aceita nulos: sem eles o mock responde 400. */
export const ANIMAL_CHILDBIRTH_REQUIRED_FIELDS: readonly (keyof AnimalChildbirthApiRequest)[] =
  ['gender', 'condition', 'breedId']

export const animalChildbirthsStore =
  createEventMockStore<AnimalChildbirthRecord>(
    animalChildbirthsData as AnimalChildbirthRecord[]
  )
