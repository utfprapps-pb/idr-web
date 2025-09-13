import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

import animalDeathsData from '@database/animalDeathsData.json'

import type { AnimalDeathDetailsApiResponse } from '../../../domain/models/animal-deaths-model'

export const getAnimalDeathHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId' | 'id'>,
  never,
  AnimalDeathDetailsApiResponse
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/deaths/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    if (!animalDeathsData.length) {
      return HttpResponse.json({} as AnimalDeathDetailsApiResponse, {
        status: 404,
      })
    }

    const animalDeathFound = animalDeathsData.find(
      (animal) => animal.id === Number(params.id)
    )

    if (!animalDeathFound) {
      return HttpResponse.json({} as AnimalDeathDetailsApiResponse, {
        status: 404,
      })
    }

    return HttpResponse.json(
      {
        date: animalDeathFound.date,
        reason: animalDeathFound.reason,
      },
      { status: HttpStatusCode.ok }
    )
  },
})
