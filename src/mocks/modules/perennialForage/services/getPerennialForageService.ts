import { faker } from '@faker-js/faker'
import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/data/protocols/http'
import { httpWithMiddleware } from '@/mocks/lib'
import { withAuth, withDelay } from '@/mocks/middleware'

import perennialForagesData from '@database/perennialForagesData.json'

export const getPerennialForageService = httpWithMiddleware<
  PathParams<'propertyId' | 'id'>,
  never,
  never
>({
  routePath: '/api/properties/:propertyId/perennial-forages/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    if (!perennialForagesData.length) {
      return HttpResponse.json(
        {},
        {
          status: 404,
        }
      )
    }

    const perennialForageFound = perennialForagesData.find(
      (perennialForage) => perennialForage.id === String(params.id)
    )

    if (!perennialForageFound) {
      return HttpResponse.json(
        {},
        {
          status: 404,
        }
      )
    }

    return HttpResponse.json(
      {
        cultivation: {
          label: perennialForageFound.cultivation,
          value: faker.string.uuid(),
        },
        area: perennialForageFound.area,
        averageCost: perennialForageFound.averageCost,
        usefulLife: perennialForageFound.usefulLife,
        formation: perennialForageFound.formation,
        type: perennialForageFound.type,
        observation: perennialForageFound.observation,
      },
      { status: HttpStatusCode.ok }
    )
  },
})
