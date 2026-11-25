import { faker } from '@faker-js/faker/locale/pt_BR'

import { eventsPerAnimal } from './animal-events.mjs'

export const animalPurchasesDependencies = ['animals']

/** Registros no formato da API do backend, cada um de um animal do seed. */
export const animalPurchasesData = eventsPerAnimal(1, () => ({
  datePurchase: faker.date.past().toISOString().slice(0, 10),
  birthDate: faker.date.past().toISOString().slice(0, 10),
  value: faker.number.float({ min: 1, max: 10000, fractionDigits: 2 }),
  weight: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
}))
