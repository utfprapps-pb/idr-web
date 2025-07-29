import { faker } from '@faker-js/faker/locale/pt_PT'
import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

import propertiesData from '@database/propertiesData.json'

export const getPropertyHandler = httpWithMiddleware<
  PathParams<'id'>,
  never,
  never
>({
  routePath: '/api/properties/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    if (!propertiesData.length) {
      return HttpResponse.json(
        {},
        {
          status: 404,
        }
      )
    }

    const propertyFound = propertiesData.find(
      (property) => property.id === String(params.id)
    )

    if (!propertyFound) {
      return HttpResponse.json(
        {},
        {
          status: 404,
        }
      )
    }

    return HttpResponse.json(
      {
        general: {
          name: propertyFound.name,
          producer: propertyFound.producer,
          city: propertyFound.city,
          state: propertyFound.state,
          leaseAveragePricePerHectare: faker.finance.amount(),
          nakedAveragePricePerHectare: faker.finance.amount(),
          responsibleTechnicians: Array.from(
            {
              length: 3,
            },
            () => ({
              value: faker.string.uuid(),
              label: faker.person.fullName(),
            })
          ),
        },
        collaborators: Array.from({ length: 5 }, () => ({
          id: faker.string.uuid(),
          name: faker.person.fullName(),
          hoursPerDay: String(faker.number.int({ min: 1, max: 8 })),
        })),
        localization: {
          images: Array.from({ length: 3 }, () => faker.image.url()),
          latitude: String(faker.location.latitude()),
          longitude: String(faker.location.longitude()),
        },
        totalArea: {
          dairyCattleFarming: String(faker.number.float({ min: 1, max: 20 })),
          perennialPasture: String(faker.number.float({ min: 1, max: 20 })),
          summerPlowing: String(faker.number.float({ min: 1, max: 20 })),
          winterPlowing: String(faker.number.float({ min: 1, max: 20 })),
        },
      },
      { status: HttpStatusCode.ok }
    )
  },
})
