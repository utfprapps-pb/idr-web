import { faker } from '@faker-js/faker/locale/pt_BR'

export const producersData = Array.from(
  {
    length: faker.number.int({
      min: 10,
      max: 50,
    }),
  },
  () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    cpf: faker.helpers.replaceSymbols('###.###.###-##'),
  })
)
