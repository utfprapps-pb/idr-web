import { faker } from '@faker-js/faker/locale/pt_BR'

const CMT_RESULTS = ['PLUS-ONE', 'PLUS-TWO', 'PLUS-THREE', 'ABSENT']

/** Registros no formato da API do backend (sem `animalId`, que vem da rota do mock). */
export const animalMastitidesData = Array.from(
  {
    length: faker.number.int({
      min: 1,
      max: 100,
    }),
  },
  () => ({
    id: faker.string.uuid(),
    diagnoseDate: faker.date.past().toISOString().slice(0, 10),
    mastitisType: faker.helpers.arrayElement(['CLINICAL', 'SUBCLINICAL']),
    cmtResult: null,
    ad: faker.helpers.arrayElement(CMT_RESULTS),
    ae: faker.helpers.arrayElement(CMT_RESULTS),
    pd: faker.helpers.arrayElement(CMT_RESULTS),
    pe: faker.helpers.arrayElement(CMT_RESULTS),
  })
)
