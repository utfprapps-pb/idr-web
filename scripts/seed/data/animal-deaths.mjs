import { faker } from '@faker-js/faker/locale/pt_BR'

import { animalsData } from './animals.mjs'

export const animalDeathsDependencies = ['animals']

/**
 * Registros no formato da API do backend, cada um de um animal do seed. A API
 * aceita um único óbito por animal: parte do rebanho tem um, o resto nenhum.
 */
export const animalDeathsData = animalsData
  .filter(() => faker.datatype.boolean({ probability: 0.1 }))
  .map((animal) => ({
    id: faker.string.uuid(),
    animalId: animal.id,
    deathDate: faker.date.past().toISOString().slice(0, 10),
    reason: faker.lorem.paragraph(1),
  }))
