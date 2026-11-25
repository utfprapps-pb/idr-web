import { faker } from '@faker-js/faker/locale/pt_BR'

import { eventsPerAnimal } from './animal-events.mjs'

export const animalInseminationsDependencies = ['animals']

/** Registros no formato da API do backend, cada um de um animal do seed. */
export const animalInseminationsData = eventsPerAnimal(3, () => ({
  iaDate: faker.date.past().toISOString().slice(0, 10),
  bull: faker.animal.cow(),
}))
