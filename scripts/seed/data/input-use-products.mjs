import { faker } from '@faker-js/faker/locale/pt_BR'

import { inputUseProductCategoriesData } from './input-use-product-categories.mjs'

export const inputUseProductsDependencies = ['inputUseProductCategories']

export const inputUseProductsData = []

inputUseProductCategoriesData.forEach((category) => {
  const numberOfProducts = faker.number.int({ min: 5, max: 15 })

  for (let i = 0; i < numberOfProducts; i += 1) {
    inputUseProductsData.push({
      id: inputUseProductsData.length + 1,
      name: faker.commerce.productName(),
      category: category.name,
      activeIngredient: faker.science.chemicalElement().name,
    })
  }
})
