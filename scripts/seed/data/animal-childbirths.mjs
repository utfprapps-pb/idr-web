import { faker } from '@faker-js/faker/locale/pt_BR'

import { allBreedsData } from './breeds.mjs'

export const animalChildbirthsData = Array.from(
  {
    length: faker.number.int({
      min: 1,
      max: 100,
    }),
  },
  () => ({
    id: faker.string.uuid(),
    breedId: faker.helpers.arrayElement(allBreedsData).id,
    gender: faker.helpers.arrayElement(['MALE', 'FEMALE']),
    weight: faker.number.float({ min: 20, max: 60, fractionDigits: 2 }),
    condition: faker.helpers.arrayElement(['ALIVE', 'DEAD']),
    date: faker.date.past(),
  })
)
