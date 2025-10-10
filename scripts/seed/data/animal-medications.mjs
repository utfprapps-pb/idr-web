import { faker } from '@faker-js/faker/locale/pt_BR'

export const animalMedicationsData = Array.from(
  {
    length: faker.number.int({
      min: 1,
      max: 100,
    }),
  },
  (_, index) => ({
    id: index + 1,
    date: faker.date.past(),
    product: faker.commerce.productName(),
    activeIngredient: faker.science.chemicalElement().name,
    appliedDose: faker.number
      .float({
        min: 1,
        max: 1000,
      })
      .toFixed(2),
    applicationMethod: faker.helpers.arrayElement([
      'IV',
      'IM',
      'SC',
      'IntraMammary',
      'PourOn',
    ]),
  })
)
