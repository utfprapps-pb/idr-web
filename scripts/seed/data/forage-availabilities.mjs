import { faker } from '@faker-js/faker/locale/pt_BR'

import { foragesData } from './forages.mjs'

export const forageAvailabilitiesDependencies = ['forages']

export const forageAvailabilitiesData = Array.from(
  {
    length: faker.number.int({
      min: 50,
      max: 150,
    }),
  },
  (_, index) => {
    const forage = faker.helpers.arrayElement(foragesData)

    return {
      id: index + 1,
      date: faker.date.recent(),
      forage: forage.cultivation,
      entranceCm: faker.number.int({ min: 20, max: 40 }),
      residueCm: faker.number.int({ min: 5, max: 15 }),
      kgPerSquareMeter: faker.number.float({
        min: 0.5,
        max: 3,
        fractionDigits: 2,
      }),
      paddockArea: faker.number.int({ min: 500, max: 5000 }),
      efficiencyPercent: faker.number.int({ min: 60, max: 90 }),
      numberOfCows: faker.number.int({ min: 10, max: 100 }),
    }
  }
)
