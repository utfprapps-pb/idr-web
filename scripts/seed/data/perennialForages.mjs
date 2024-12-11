import { faker } from '@faker-js/faker/locale/pt_BR'

export const perennialForagesData = Array.from(
  {
    length: faker.number.int({
      min: 1,
      max: 100,
    }),
  },
  () => ({
    id: faker.string.uuid(),
    description: faker.lorem.sentence(),
    area: String(
      faker.number.float({
        min: 1,
        max: 1000,
      })
    ),
    averageCost: String(
      faker.number.float({
        min: 1,
        max: 1000,
      })
    ),
    usefulLife: String(
      faker.number.int({
        min: 1,
        max: 100,
      })
    ),
    formation: faker.date.past(),
    // todo: validar types do backend e ajustar o mock
    type: faker.helpers.arrayElement(['Terra arrendada', 'Terra própria']),
    observation: faker.lorem.sentence({
      min: 10,
      max: 20,
    }),
  })
)
