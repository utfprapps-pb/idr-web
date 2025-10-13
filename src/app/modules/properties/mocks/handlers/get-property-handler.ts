import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

import propertiesData from '@database/propertiesData.json'

import type { PropertyDetailsApiResponse } from '../../domain/models/properties-model'

export const getPropertyHandler = httpWithMiddleware<
  PathParams<'id'>,
  never,
  PropertyDetailsApiResponse
>({
  routePath: '/api/properties/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    if (!propertiesData.length) {
      return HttpResponse.json({} as PropertyDetailsApiResponse, {
        status: 404,
      })
    }

    const propertyFound = propertiesData.find(
      (property) => property.id === Number(params.id)
    )

    if (!propertyFound) {
      return HttpResponse.json({} as PropertyDetailsApiResponse, {
        status: 404,
      })
    }

    return HttpResponse.json(propertyFound, { status: HttpStatusCode.ok })
  },
})
