import { faker } from '@faker-js/faker/locale/pt_BR'

export const animalPregnancyDiagnosesData = Array.from(
  {
    length: faker.number.int({
      min: 1,
      max: 100,
    }),
  },
  () => ({
    id: faker.string.uuid(),
    date: faker.date.past(),
    lastInseminationDate: faker.date.past(),
  })
)
