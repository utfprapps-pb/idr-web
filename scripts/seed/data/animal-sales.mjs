import { faker } from '@faker-js/faker/locale/pt_BR'

export const animalSalesData = Array.from(
  {
    length: faker.number.int({
      min: 1,
      max: 100,
    }),
  },
  (_, index) => ({
    id: index + 1,
    date: faker.date.past(),
    reason: faker.helpers.arrayElement(['VOLUNTARY', 'DISCARD', 'EMERGENCY']),
    destination: faker.helpers.arrayElement(['SLAUGHTER', 'PRODUCTION']),
    weight: faker.number
      .float({
        min: 1,
        max: 1000,
      })
      .toFixed(2),
    price: faker.number
      .float({
        min: 1,
        max: 10000,
      })
      .toFixed(2),
  })
)
