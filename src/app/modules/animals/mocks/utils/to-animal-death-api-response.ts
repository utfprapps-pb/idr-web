import type { AnimalDeathApiResponse } from '../../domain/models/animal-deaths-model'

type AnimalDeathSeed = {
  id: string
  date: string
  reason: string
}

/** Seed record -> real API shape (`deathDate`/`reason`). */
export function toAnimalDeathApiResponse(
  death: AnimalDeathSeed,
  animalId: string
): AnimalDeathApiResponse {
  return {
    id: death.id,
    animalId,
    reason: death.reason,
    deathDate: death.date,
  }
}
