import { faker } from '@faker-js/faker/locale/pt_BR'

import { eventsPerAnimal } from './animal-events.mjs'

const CMT_RESULTS = ['PLUS-ONE', 'PLUS-TWO', 'PLUS-THREE', 'ABSENT']

export const animalMastitidesDependencies = ['animals']

/** Registros no formato da API do backend, cada um de um animal do seed. */
export const animalMastitidesData = eventsPerAnimal(3, () => ({
  diagnoseDate: faker.date.past().toISOString().slice(0, 10),
  mastitisType: faker.helpers.arrayElement(['CLINICAL', 'SUBCLINICAL']),
  cmtResult: null,
  ad: faker.helpers.arrayElement(CMT_RESULTS),
  ae: faker.helpers.arrayElement(CMT_RESULTS),
  pd: faker.helpers.arrayElement(CMT_RESULTS),
  pe: faker.helpers.arrayElement(CMT_RESULTS),
}))
