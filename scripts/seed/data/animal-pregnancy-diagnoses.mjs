import { faker } from '@faker-js/faker/locale/pt_BR'

/** Registros no formato da API do backend (sem `animalId`, que vem da rota do mock). */
export const animalPregnancyDiagnosesData = Array.from(
  {
    length: faker.number.int({
      min: 1,
      max: 100,
    }),
  },
  () => ({
    id: faker.string.uuid(),
    diagnoseDate: faker.date.past().toISOString().slice(0, 10),
    lastIa: faker.date.past().toISOString().slice(0, 10),
  })
)
