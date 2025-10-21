import { faker } from '@faker-js/faker/locale/pt_BR'

export const cultivationPestsData = Array.from(
  {
    length: faker.number.int({
      min: 1,
      max: 100,
    }),
  },
  (_, index) => ({
    id: index + 1,
    cultivation: {
      id: faker.number.int({ min: 1, max: 100 }),
      name: faker.lorem.words(2),
    },
    pest: {
      id: faker.number.int({ min: 1, max: 100 }),
      name: faker.lorem.words(2),
    },
    infestationType: faker.helpers.arrayElement(['LOW', 'MEDIUM', 'HIGH']),
  })
)
