import { faker } from '@faker-js/faker/locale/pt_BR'

export const generalCultivationPestsData = Array.from(
  {
    length: faker.number.int({
      min: 50,
      max: 150,
    }),
  },
  (_, index) => ({
    id: index + 1,
    name: faker.lorem.words({ min: 2, max: 5 }),
  })
)
