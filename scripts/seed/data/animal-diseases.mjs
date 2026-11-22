import { faker } from '@faker-js/faker/locale/pt_BR'

import { eventsPerAnimal } from './animal-events.mjs'

export const animalDiseasesDependencies = ['animals']

/** Registros no formato da API do backend, cada um de um animal do seed. */
export const animalDiseasesData = eventsPerAnimal(3, () => ({
  diagnosisDate: faker.date.past().toISOString().slice(0, 10),
  diagnosis: faker.lorem.paragraph(1),
}))
