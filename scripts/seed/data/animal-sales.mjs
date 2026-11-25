import { faker } from '@faker-js/faker/locale/pt_BR'

import { eventsPerAnimal } from './animal-events.mjs'

export const animalSalesDependencies = ['animals']

/** Registros no formato da API do backend, cada um de um animal do seed. */
export const animalSalesData = eventsPerAnimal(1, () => ({
  dateSale: faker.date.past().toISOString().slice(0, 10),
  reason: faker.helpers.arrayElement(['VOLUNTARIA', 'DESCARTE', 'EMERGENCIA']),
  value: faker.number.float({ min: 1, max: 10000, fractionDigits: 2 }),
  destination: faker.helpers.arrayElement(['ABATE', 'PRODUCAO']),
  weight: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
}))
