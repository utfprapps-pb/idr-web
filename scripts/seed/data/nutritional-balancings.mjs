import { faker } from '@faker-js/faker/locale/pt_BR'

import { animalsData } from './animals.mjs'

export const nutritionalBalancingsDependencies = ['animals']

const numberOfVisits = faker.number.int({ min: 2, max: 5 })

export const nutritionalBalancingsData = []

for (let visitIndex = 0; visitIndex < numberOfVisits; visitIndex += 1) {
  const visitId = visitIndex + 1
  const visitDate = faker.date.past().toISOString()

  animalsData.forEach((animal) => {
    nutritionalBalancingsData.push({
      id: nutritionalBalancingsData.length + 1,
      date: visitDate,
      visitId,
      animalId: animal.id,
      animal: animal.identifier,
      breed: animal.breed.breedName,
      weight: animal.currentWeight,
      milkProduction: faker.number.float({
        min: 1,
        max: 50,
        fractionDigits: 2,
      }),
      estimatedMilkProduction: faker.number.float({
        min: 5,
        max: 50,
        fractionDigits: 2,
      }),
    })
  })
}
