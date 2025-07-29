import { faker } from '@faker-js/faker/locale/pt_BR'

export const propertiesData = Array.from(
  {
    length: faker.number.int({
      min: 20,
      max: 100,
    }),
  },
  (_, index) => ({
    id: index + 1,
    name: faker.company.name(),
    user: {
      displayName: faker.person.fullName(),
    },
  })
)
