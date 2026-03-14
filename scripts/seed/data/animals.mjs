import { faker } from '@faker-js/faker/locale/pt_BR'

export const animalsData = Array.from(
  {
    length: faker.number.int({
      min: 1,
      max: 100,
    }),
  },
  (_, index) => ({
    id: index + 1,
    name: faker.lorem.word(),
    breed: faker.animal.cow(),
    weight: faker.number
      .float({
        min: 1,
        max: 1000,
      })
      .toFixed(2),
    ecc: faker.number
      .float({
        min: 1,
        max: 10,
      })
      .toFixed(2),
    milkProduction: faker.number
      .float({
        min: 1,
        max: 50,
      })
      .toFixed(2),
  })
)
