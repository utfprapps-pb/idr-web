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
    crudeProtein: faker.number.float({ min: 1, max: 100, fractionDigits: 2 }),
    totalDigestibleNutrients: faker.number.float({
      min: 1,
      max: 100,
      fractionDigits: 2,
    }),
    dryMatter: faker.number.float({ min: 1, max: 100, fractionDigits: 2 }),
    calcium: faker.number.float({ min: 1, max: 100, fractionDigits: 2 }),
    phosphorus: faker.number.float({ min: 1, max: 100, fractionDigits: 2 }),
    nonFibrousCarbohydrates: faker.number.float({
      min: 1,
      max: 100,
      fractionDigits: 2,
    }),
    etherExtract: faker.number.float({ min: 1, max: 100, fractionDigits: 2 }),
    rumenDegradableProtein: faker.number.float({
      min: 1,
      max: 100,
      fractionDigits: 2,
    }),
  })
)
