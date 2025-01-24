import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/data/protocols/http'
import { httpWithMiddleware } from '@/mocks/lib'
import { withAuth, withDelay } from '@/mocks/middleware'

import improvementsData from '@database/improvementData.json'

export const getImprovementService = httpWithMiddleware<
  PathParams<'propertyId' | 'id'>,
  never,
  never
>({
  routePath: '/api/properties/:propertyId/improvements/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    if (!improvementsData.length) {
      return HttpResponse.json(
        {},
        {
          status: 404,
        }
      )
    }

    const improvementFound = improvementsData.find(
      (forage) => forage.id === String(params.id)
    )

    if (!improvementFound) {
      return HttpResponse.json(
        {},
        {
          status: 404,
        }
      )
    }

    return HttpResponse.json(improvementFound, { status: HttpStatusCode.ok })
  },
})
