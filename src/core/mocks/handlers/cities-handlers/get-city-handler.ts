import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

import citiesData from '@database/citiesData.json'

import type { CityApiResponse } from '@/core/domain/models/city-model'

export const getCityHandler = httpWithMiddleware<
  PathParams<'id'>,
  never,
  CityApiResponse
>({
  routePath: '/api/v1/cities/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    const city = (citiesData as CityApiResponse[]).find(
      (c) => c.id === params.id
    )

    if (!city) {
      return HttpResponse.json({} as CityApiResponse, {
        status: HttpStatusCode.notFound,
      })
    }

    return HttpResponse.json(city, { status: HttpStatusCode.ok })
  },
})
