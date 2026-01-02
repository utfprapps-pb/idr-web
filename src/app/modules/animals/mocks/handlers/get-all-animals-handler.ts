import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

import animalsData from '@database/animalsData.json'

import type { AnimalApiResponse } from '../../domain/models/animals-model'
import type { MockParams } from '@/core/mocks/types/mock-params-type'

export const getAllAnimalsHandler = httpWithMiddleware<
  PathParams<'propertyId'>,
  MockParams<AnimalApiResponse>,
  AnimalApiResponse[]
>({
  routePath: '/api/properties/:propertyId/animals/all',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async () => {
    if (!animalsData.length) {
      return HttpResponse.json(null, {
        status: 404,
      })
    }

    return HttpResponse.json(animalsData as AnimalApiResponse[], {
      status: HttpStatusCode.ok,
    })
  },
})
