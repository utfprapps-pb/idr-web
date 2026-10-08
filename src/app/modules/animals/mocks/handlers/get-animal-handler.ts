import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

import animalsData from '@database/animalsData.json'

import type { AnimalDetailsApiResponse } from '../../domain/models/animals-model'

export const getAnimalHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'id'>,
  never,
  AnimalDetailsApiResponse
>({
  routePath: '/api/properties/:propertyId/animals/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    if (!animalsData.length) {
      return HttpResponse.json({} as AnimalDetailsApiResponse, {
        status: 404,
      })
    }

    const animalFound = animalsData.find((animal) => animal.id === params.id)

    if (!animalFound) {
      return HttpResponse.json({} as AnimalDetailsApiResponse, {
        status: 404,
      })
    }

    return HttpResponse.json(animalFound, { status: HttpStatusCode.ok })
  },
})
