import { faker } from '@faker-js/faker/locale/pt_BR'

export const animalDiseasesData = Array.from(
  {
    length: faker.number.int({
      min: 1,
      max: 100,
    }),
  },
  () => ({
    id: faker.string.uuid(),
    diagnosticDate: faker.date.past(),
    diagnostic: faker.lorem.paragraph(1),
  })
)
