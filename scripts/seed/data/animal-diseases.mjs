import { faker } from '@faker-js/faker/locale/pt_BR'

export const animalDiseasesData = Array.from(
  {
    length: faker.number.int({
      min: 1,
      max: 100,
    }),
  },
  (_, index) => ({
    id: index + 1,
    diagnosticDate: faker.date.past(),
    diagnostic: faker.lorem.paragraph(1),
  })
)
