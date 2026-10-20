import { faker } from '@faker-js/faker/locale/pt_BR'

/** Registros no formato da API do backend (sem `animalId`, que vem da rota do mock). */
export const animalPurchasesData = Array.from(
  {
    length: faker.number.int({
      min: 1,
      max: 100,
    }),
  },
  () => ({
    id: faker.string.uuid(),
    datePurchase: faker.date.past().toISOString().slice(0, 10),
    birthDate: faker.date.past().toISOString().slice(0, 10),
    value: faker.number.float({ min: 1, max: 10000, fractionDigits: 2 }),
    weight: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
  })
)
