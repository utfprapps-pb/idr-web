import { faker } from '@faker-js/faker/locale/pt_BR'

export const animalHeiferCalfStagesData = Array.from(
  {
    length: faker.number.int({
      min: 1,
      max: 100,
    }),
  },
  () => {
    const years = faker.number.int({
      min: 0,
      max: 6,
    })

    const months = faker.number.int({
      min: 1,
      max: 12,
    })

    const age =
      years === 0 ? `${months} meses` : `${years} anos e ${months} meses`

    return {
      id: faker.string.uuid(),
      weighingDate: faker.date.past(),
      weight: faker.number
        .float({
          min: 1,
          max: 1000,
        })
        .toFixed(2),
      ecc: faker.number
        .float({
          min: 1,
          max: 10,
        })
        .toFixed(2),
      age,
    }
  }
)
