import { faker } from '@faker-js/faker/locale/pt_BR'

export const improvementsData = Array.from(
  {
    length: faker.number.int({
      min: 20,
      max: 100,
    }),
  },
  (_, index) => ({
    id: index + 1,
    type: faker.lorem.words(4),
    name: faker.lorem.words(4),
    amount: faker.number.int({ min: 10, max: 100 }),
    unitPrice: faker.number.float({
      min: 1,
      max: 1000,
      fractionDigits: 2,
    }),
    percentDairyCattle: faker.number.float({
      min: 1,
      max: 100,
      fractionDigits: 2,
    }),
    lifespan: faker.number.int({
      min: 1,
      max: 100,
    }),
    acquisitionDate: faker.date.past(),
    moneyDairyCattle: faker.number.float({
      min: 1,
      max: 1000,
      fractionDigits: 2,
    }),
  })
)
