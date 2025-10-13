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
    city: faker.location.city(),
    state: faker.location.state({ abbreviated: true }),
    farmer: faker.person.fullName(),
    nakedAveragePrice: Number(
      faker.finance.amount({ min: 1000, max: 5000, dec: 2 })
    ),
    leaseAveragePrice: Number(
      faker.finance.amount({ min: 1000, max: 5000, dec: 2 })
    ),
    technicians: Array.from(
      {
        length: faker.number.int({ min: 1, max: 3 }),
      },
      () => ({
        id: faker.number.int(),
        user: {
          displayName: faker.person.fullName(),
        },
      })
    ),
    collaborators: Array.from(
      {
        length: faker.number.int({ min: 1, max: 5 }),
      },
      () => ({
        id: faker.number.int(),
        collaboratorName: faker.person.fullName(),
        workDays: faker.number.int({ min: 1, max: 7 }),
        workHours: faker.number.int({ min: 1, max: 12 }),
      })
    ),
    area: {
      dairyCattleFarming: Number(
        faker.finance.amount({ min: 0, max: 100, dec: 2 })
      ),
      perennialPasture: Number(
        faker.finance.amount({ min: 0, max: 100, dec: 2 })
      ),
      summerPlowing: Number(faker.finance.amount({ min: 0, max: 100, dec: 2 })),
      winterPlowing: Number(faker.finance.amount({ min: 0, max: 100, dec: 2 })),
    },
    latitude: Number(faker.location.latitude()),
    longitude: Number(faker.location.longitude()),
    attachment: faker.helpers.arrayElement([
      Array.from(
        {
          length: faker.number.int({ min: 1, max: 5 }),
        },
        () => faker.image.urlLoremFlickr({ category: 'nature' })
      ),
      null,
    ]),
  })
)
