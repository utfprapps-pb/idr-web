import { faker } from '@faker-js/faker/locale/pt_BR'

import { eventsPerAnimal } from './animal-events.mjs'

export const animalPregnancyDiagnosesDependencies = ['animals']

/** Registros no formato da API do backend, cada um de um animal do seed. */
export const animalPregnancyDiagnosesData = eventsPerAnimal(3, () => ({
  diagnoseDate: faker.date.past().toISOString().slice(0, 10),
  lastIa: faker.date.past().toISOString().slice(0, 10),
}))
