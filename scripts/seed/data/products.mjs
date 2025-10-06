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
      value: faker.number.int({ min: 1, max: 150 }),
      label: faker.commerce.department(),
    },
    activeIngredient: {
      value: faker.number.int({ min: 1, max: 150 }),
      label: faker.science.chemicalElement().name,
    },
  })
)
