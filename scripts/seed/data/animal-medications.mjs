import { faker } from '@faker-js/faker/locale/pt_BR'

/** Registros no formato da API do backend (sem `animalId`, que vem da rota do mock). */
export const animalMedicationsData = Array.from(
  {
    length: faker.number.int({
      min: 1,
      max: 100,
    }),
  },
  () => ({
    id: faker.string.uuid(),
    productId: null,
    applicationDate: faker.date.past().toISOString().slice(0, 10),
    appliedDose: faker.number.float({ min: 1, max: 1000 }).toFixed(2),
    applicationWay: faker.helpers.arrayElement([
      'IV',
      'IM',
      'SC',
      'IntraMammary',
      'PourOn',
    ]),
  })
)
