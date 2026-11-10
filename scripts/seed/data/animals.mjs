import { faker } from '@faker-js/faker/locale/pt_BR'

import { allBreedsData } from './breeds.mjs'

export const animalsData = Array.from(
  {
    length: faker.number.int({
      min: 1,
      max: 100,
    }),
  },
  () => ({
    id: faker.string.uuid(),
    identifier: faker.lorem.word(),
    breedId: faker.helpers.arrayElement(allBreedsData).id,
    currentWeight: faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),
    ecc: faker.number.float({ min: 1, max: 10, fractionDigits: 2 }),
  })
)
