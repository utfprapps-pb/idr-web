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
  })
)
