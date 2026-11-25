import { faker } from '@faker-js/faker/locale/pt_BR'

import { animalsData } from './animals.mjs'

/**
 * Eventos de cada animal do seed, já com o `animalId` dono (como a API grava):
 * de 0 a `max` por animal, cada um montado por `build`.
 */
export function eventsPerAnimal(max, build) {
  return animalsData.flatMap((animal) =>
    Array.from({ length: faker.number.int({ min: 0, max }) }, () => ({
      id: faker.string.uuid(),
      animalId: animal.id,
      ...build(),
    }))
  )
}
