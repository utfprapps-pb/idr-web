import { faker } from '@faker-js/faker/locale/pt_BR'

export const nutritionalBalancingsData = Array.from(
  { length: faker.number.int({ min: 1, max: 100 }) },
  (_, index) => ({
    id: index + 1,
    date: faker.date.past().toISOString(),
    animal: faker.lorem.word(),
    breed: faker.animal.cow(),
    weight: faker.number.float({ min: 200, max: 700, fractionDigits: 2 }),

    milkProduction: faker.number.float({
      min: 5,
      max: 50,
      fractionDigits: 2,
    }),
    estimatedMilkProduction: faker.number.float({
      min: 5,
      max: 50,
      fractionDigits: 2,
    }),
  })
)
