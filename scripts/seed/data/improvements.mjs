import { faker } from '@faker-js/faker/locale/pt_BR'

export const improvementsData = Array.from(
  {
    length: faker.number.int({
      min: 1,
      max: 100,
    }),
  },
  (_, index) => ({
    id: index + 1,
    description: faker.lorem.words(5),
    amount: faker.number.int(),
    unitPrice: faker.number.float({
      fractionDigits: 2,
    }),
    percentDairyCattle: faker.number.float({
      min: 1,
      max: 100,
      fractionDigits: 2,
    }),
    usefulLife: faker.number.int({
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
