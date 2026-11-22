import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

import { animalsStore } from './animals-store'

import type { AnimalApiResponse } from '../../domain/models/animals-model'

export const getAnimalHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'id'>,
  never,
  AnimalApiResponse
>({
  routePath: '/api/properties/:propertyId/animals/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    const animalFound = animalsStore.find(
      String(params.propertyId),
      String(params.id)
    )

    if (!animalFound) {
      return HttpResponse.json({} as AnimalApiResponse, {
        status: 404,
      })
    }

    return HttpResponse.json(animalFound, { status: HttpStatusCode.ok })
  },
})
