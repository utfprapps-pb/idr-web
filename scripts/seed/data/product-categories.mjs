import { faker } from '@faker-js/faker/locale/pt_BR'

export const productCategoriesData = Array.from(
  {
    length: faker.number.int({
      min: 10,
      max: 50,
    }),
  },
  (_, index) => ({
    id: index + 1,
    name: faker.commerce.department(),
  })
)
