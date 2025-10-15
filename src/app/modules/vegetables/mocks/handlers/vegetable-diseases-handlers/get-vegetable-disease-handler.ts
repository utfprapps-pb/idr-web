import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

import vegetableDiseasesData from '@database/vegetableDiseasesData.json'

import type { VegetableDiseaseDetailsApiResponse } from '../../../domain/models/vegetable-diseases-model'

export const getVegetableDiseaseHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'id'>,
  never,
  VegetableDiseaseDetailsApiResponse
>({
  routePath: '/api/properties/:propertyId/vegetables/diseases/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    if (!vegetableDiseasesData.length) {
      return HttpResponse.json({} as VegetableDiseaseDetailsApiResponse, {
        status: 404,
      })
    }

    const vegetableDiseaseFound = vegetableDiseasesData.find(
      (vegetable) => vegetable.id === Number(params.id)
    )

    if (!vegetableDiseaseFound) {
      return HttpResponse.json({} as VegetableDiseaseDetailsApiResponse, {
        status: 404,
      })
    }

    return HttpResponse.json(vegetableDiseaseFound, {
      status: HttpStatusCode.ok,
    })
  },
})
