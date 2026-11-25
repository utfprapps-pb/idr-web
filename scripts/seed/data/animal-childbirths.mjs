import { faker } from '@faker-js/faker/locale/pt_BR'

import { eventsPerAnimal } from './animal-events.mjs'
import { allBreedsData } from './breeds.mjs'

export const animalChildbirthsDependencies = ['animals']

/** Registros no formato da API do backend, cada um de um animal do seed. */
export const animalChildbirthsData = eventsPerAnimal(3, () => ({
  childbirthDate: faker.date.past().toISOString().slice(0, 10),
  gender: faker.helpers.arrayElement(['MALE', 'FEMALE']),
  weight: faker.number.float({ min: 20, max: 60, fractionDigits: 2 }),
  condition: faker.helpers.arrayElement(['ALIVE', 'DEAD']),
  breedId: faker.helpers.arrayElement(allBreedsData).id,
  calfId: null,
}))
