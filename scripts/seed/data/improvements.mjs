import { faker } from '@faker-js/faker/locale/pt_BR'

export const forageData = Array.from(
  {
    length: faker.number.int({
      min: 1,
      max: 100,
    }),
  },
  () => ({
    id: faker.string.uuid(),
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
