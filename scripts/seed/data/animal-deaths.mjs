import { faker } from '@faker-js/faker/locale/pt_BR'

/** Registros no formato da API do backend (sem `animalId`, que vem da rota do mock). */
export const animalDeathsData = Array.from(
  {
    length: faker.number.int({
      min: 1,
      max: 1,
    }),
  },
  () => ({
    id: faker.string.uuid(),
    deathDate: faker.date.past().toISOString().slice(0, 10),
    reason: faker.lorem.paragraph(1),
  })
)
