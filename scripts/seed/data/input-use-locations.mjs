import { faker } from '@faker-js/faker/locale/pt_BR'

export const inputUseLocationsData = Array.from(
  {
    length: faker.number.int({
      min: 50,
      max: 150,
    }),
  },
  (_, index) => ({
    id: index + 1,
    description: `${faker.location.street()}, ${faker.number.int({ min: 1, max: 100 })}`,
  })
)
