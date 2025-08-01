import { faker } from '@faker-js/faker/locale/pt_BR'

export const foragesData = Array.from(
  {
    length: faker.number.int({
      min: 1,
      max: 100,
    }),
  },
  (_, index) => ({
    id: index + 1,
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
    ownershipType: faker.helpers.arrayElement(['LEASED_LAND', 'OWNED_LAND']),
    growthCycle: faker.helpers.arrayElement(['ANNUAL', 'PERENNIAL']),
    observation: faker.lorem.sentence({
      min: 10,
      max: 20,
    }),
  })
)
