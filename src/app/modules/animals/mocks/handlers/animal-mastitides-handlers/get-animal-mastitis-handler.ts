import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

import animalMastitidesData from '@database/animalMastitidesData.json'

import type { AnimalMastitisApiResponse } from '../../../domain/models/animal-mastitides-model'

export const getAnimalMastitisHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId' | 'id'>,
  never,
  AnimalMastitisApiResponse
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/mastitides/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    if (!animalMastitidesData.length) {
      return HttpResponse.json({} as AnimalMastitisApiResponse, {
        status: 404,
      })
    }

    const animalMastitisFound = animalMastitidesData.find(
      (animal) => animal.id === params.id
    )

    if (!animalMastitisFound) {
      return HttpResponse.json({} as AnimalMastitisApiResponse, {
        status: 404,
      })
    }

    return HttpResponse.json(
      {
        id: animalMastitisFound.id,
        animalId: String(params.animalId),
        cmtResult: null,
        diagnoseDate: animalMastitisFound.date,
        mastitisType: animalMastitisFound.type,
        ad: animalMastitisFound.ad,
        ae: animalMastitisFound.ae,
        pd: animalMastitisFound.pd,
        pe: animalMastitisFound.pe,
      },
      { status: HttpStatusCode.ok }
    )
  },
})
