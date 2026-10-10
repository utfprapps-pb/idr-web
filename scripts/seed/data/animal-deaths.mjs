import { faker } from '@faker-js/faker/locale/pt_BR'

export const animalDeathsData = Array.from(
  {
    length: faker.number.int({
      min: 1,
      max: 1,
    }),
  },
  () => ({
    id: faker.string.uuid(),
    date: faker.date.past(),
    reason: faker.lorem.paragraph(1),
  })
)
