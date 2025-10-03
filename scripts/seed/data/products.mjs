import { faker } from '@faker-js/faker/locale/pt_BR'

export const allProductsData = Array.from(
  {
    length: faker.number.int({
      min: 50,
      max: 150,
    }),
  },
  (_, index) => ({
    id: index + 1,
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    category: {
      id: faker.number.int({ min: 1, max: 150 }),
      description: faker.commerce.department(),
    },
    activeIngredient: {
      id: faker.number.int({ min: 1, max: 150 }),
      name: faker.science.chemicalElement().name,
    },
  })
)
