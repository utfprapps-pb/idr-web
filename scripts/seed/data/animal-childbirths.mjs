import { faker } from '@faker-js/faker/locale/pt_BR'

import { allBreedsData } from './breeds.mjs'

/** Registros no formato da API do backend (sem `animalId`, que vem da rota do mock). */
export const animalChildbirthsData = Array.from(
  {
    length: faker.number.int({
      min: 1,
      max: 100,
    }),
  },
  () => ({
    id: faker.string.uuid(),
    childbirthDate: faker.date.past().toISOString().slice(0, 10),
    gender: faker.helpers.arrayElement(['MALE', 'FEMALE']),
    weight: faker.number.float({ min: 20, max: 60, fractionDigits: 2 }),
    condition: faker.helpers.arrayElement(['ALIVE', 'DEAD']),
    breedId: faker.helpers.arrayElement(allBreedsData).id,
    calfId: null,
  })
)
