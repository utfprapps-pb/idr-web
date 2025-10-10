import { faker } from '@faker-js/faker/locale/pt_BR'

export const animalMastitidesData = Array.from(
  {
    length: faker.number.int({
      min: 1,
      max: 100,
    }),
  },
  (_, index) => ({
    id: index + 1,
    date: faker.date.past(),
    type: faker.helpers.arrayElement(['CLINICAL', 'SUBCLINICAL']),
    ad: faker.helpers.arrayElement([
      'PLUS-ONE',
      'PLUS-TWO',
      'PLUS-THREE',
      'ABSENT',
    ]),
    ae: faker.helpers.arrayElement([
      'PLUS-ONE',
      'PLUS-TWO',
      'PLUS-THREE',
      'ABSENT',
    ]),
    pd: faker.helpers.arrayElement([
      'PLUS-ONE',
      'PLUS-TWO',
      'PLUS-THREE',
      'ABSENT',
    ]),
    pe: faker.helpers.arrayElement([
      'PLUS-ONE',
      'PLUS-TWO',
      'PLUS-THREE',
      'ABSENT',
    ]),
  })
)
