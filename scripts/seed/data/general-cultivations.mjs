import { faker } from '@faker-js/faker/locale/pt_BR'

export const generalCultivationsData = Array.from(
  {
    length: faker.number.int({
      min: 50,
      max: 150,
    }),
  },
  (_, index) => ({
    id: index + 1,
    name: faker.food.vegetable(),
    type: faker.helpers.arrayElement(['FORAGE', 'CONCENTRATE', 'MINERAL']),
  })
)
