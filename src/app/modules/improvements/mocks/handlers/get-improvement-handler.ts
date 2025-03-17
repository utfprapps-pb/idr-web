import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

import improvementsData from '@database/improvementData.json'

export const getImprovementHandler = httpWithMiddleware<
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
      (improvement) => improvement.id === String(params.id)
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
