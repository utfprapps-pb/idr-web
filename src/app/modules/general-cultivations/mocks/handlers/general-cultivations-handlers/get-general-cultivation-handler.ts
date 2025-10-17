import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

import generalCultivationsData from '@database/generalCultivationsData.json'

import type { GeneralCultivationDetailsApiResponse } from '../../../domain/models/general-cultivations-model'

export const getGeneralCultivationHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'id'>,
  never,
  GeneralCultivationDetailsApiResponse
>({
  routePath: '/api/general-cultivations/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    if (!generalCultivationsData.length) {
      return HttpResponse.json({} as GeneralCultivationDetailsApiResponse, {
        status: 404,
      })
    }

    const generalCultivationsFound = generalCultivationsData.find(
      (generalCultivation) => generalCultivation.id === Number(params.id)
    )

    if (!generalCultivationsFound) {
      return HttpResponse.json({} as GeneralCultivationDetailsApiResponse, {
        status: 404,
      })
    }

    return HttpResponse.json(generalCultivationsFound, {
      status: HttpStatusCode.ok,
    })
  },
})
