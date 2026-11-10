import { faker } from '@faker-js/faker/locale/pt_BR'

/** Registros no formato da API do backend (sem `animalId`, que vem da rota do mock). */
export const animalSalesData = Array.from(
  {
    length: faker.number.int({
      min: 1,
      max: 100,
    }),
  },
  () => ({
    id: faker.string.uuid(),
    dateSale: faker.date.past().toISOString().slice(0, 10),
    reason: faker.helpers.arrayElement([
      'VOLUNTARIA',
      'DESCARTE',
      'EMERGENCIA',
    ]),
    value: faker.number.float({ min: 1, max: 10000, fractionDigits: 2 }),
    destination: faker.helpers.arrayElement(['ABATE', 'PRODUCAO']),
    weight: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
  })
)
