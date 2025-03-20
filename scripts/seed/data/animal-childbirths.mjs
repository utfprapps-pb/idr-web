import { faker } from '@faker-js/faker/locale/pt_BR'

export const animalChildbirthsData = Array.from(
  {
    length: faker.number.int({
      min: 1,
      max: 100,
    }),
  },
  () => ({
    id: faker.string.uuid(),
    breed: faker.animal.cow(),
    gender: faker.helpers.arrayElement(['MALE', 'FEMALE']),
    weight: faker.number
      .float({
        min: 1,
        max: 1000,
      })
      .toFixed(2),
    condition: faker.helpers.arrayElement(['ALIVE', 'DEAD']),
    date: faker.date.past(),
  })
)
