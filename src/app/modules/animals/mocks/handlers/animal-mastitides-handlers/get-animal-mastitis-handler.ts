import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

import animalMastitidesData from '@database/animalMastitidesData.json'

import type { AnimalMastitisDetailsApiResponse } from '../../../domain/models/animal-mastitides-model'

export const getAnimalMastitisHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId' | 'id'>,
  never,
  AnimalMastitisDetailsApiResponse
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/mastitides/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    if (!animalMastitidesData.length) {
      return HttpResponse.json({} as AnimalMastitisDetailsApiResponse, {
        status: 404,
      })
    }

    const animalMastitisFound = animalMastitidesData.find(
      (animal) => animal.id === Number(params.id)
    )

    if (!animalMastitisFound) {
      return HttpResponse.json({} as AnimalMastitisDetailsApiResponse, {
        status: 404,
      })
    }

    return HttpResponse.json(
      {
        date: animalMastitisFound.date,
        type: animalMastitisFound.type,
        ad: animalMastitisFound.ad,
        ae: animalMastitisFound.ae,
        pd: animalMastitisFound.pd,
        pe: animalMastitisFound.pe,
      },
      { status: HttpStatusCode.ok }
    )
  },
})
