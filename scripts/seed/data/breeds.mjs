import { faker } from '@faker-js/faker/locale/pt_BR'

export const allBreedsData = Array.from(
  {
    length: faker.number.int({
      min: 50,
      max: 150,
    }),
  },
  (_, index) => ({
    id: index + 1,
    breedName: faker.animal.cow(),
  })
)
