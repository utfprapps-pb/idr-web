import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

import cultivationPestsData from '@database/cultivationPestsData.json'

import type { CultivationPestDetailsApiResponse } from '../../../domain/models/cultivation-pests-model'

export const getCultivationPestHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'id'>,
  never,
  CultivationPestDetailsApiResponse
>({
  routePath: '/api/properties/:propertyId/cultivations/pests/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    if (!cultivationPestsData.length) {
      return HttpResponse.json({} as CultivationPestDetailsApiResponse, {
        status: 404,
      })
    }

    const cultivationPestFound = cultivationPestsData.find(
      (cultivation) => cultivation.id === Number(params.id)
    )

    if (!cultivationPestFound) {
      return HttpResponse.json({} as CultivationPestDetailsApiResponse, {
        status: 404,
      })
    }

    return HttpResponse.json(cultivationPestFound, {
      status: HttpStatusCode.ok,
    })
  },
})
