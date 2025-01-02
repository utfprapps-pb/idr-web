import { faker } from '@faker-js/faker'
import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/data/protocols/http'
import { httpWithMiddleware } from '@/mocks/lib'
import { withAuth, withDelay } from '@/mocks/middleware'

import foragesData from '@database/forageData.json'

export const getForageService = httpWithMiddleware<
  PathParams<'propertyId' | 'id'>,
  never,
  never
>({
  routePath: '/api/properties/:propertyId/forages/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    if (!foragesData.length) {
      return HttpResponse.json(
        {},
        {
          status: 404,
        }
      )
    }

    const forageFound = foragesData.find(
      (forage) => forage.id === String(params.id)
    )

    if (!forageFound) {
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
          label: forageFound.cultivation,
          value: faker.string.uuid(),
        },
        area: forageFound.area,
        averageCost: forageFound.averageCost,
        usefulLife: forageFound.usefulLife,
        formation: forageFound.formation,
        ownershipType: forageFound.ownershipType,
        growthCycle: forageFound.growthCycle,
        observation: forageFound.observation,
      },
      { status: HttpStatusCode.ok }
    )
  },
})
