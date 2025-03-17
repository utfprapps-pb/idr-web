import { faker } from '@faker-js/faker/locale/pt_BR'

export const animalData = Array.from(
  {
    length: faker.number.int({
      min: 1,
      max: 100,
    }),
  },
  () => ({
    id: faker.string.uuid(),
    name: faker.lorem.word(),
    breed: faker.animal.cow(),
  })
)
