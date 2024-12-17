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
    cultivation: faker.food.vegetable(),
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
    type: faker.helpers.arrayElement(['LEASED_LAND', 'OWNED_LAND']),
    observation: faker.lorem.sentence({
      min: 10,
      max: 20,
    }),
  })
)
