import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

import animalMastitidesData from '@database/animalMastitidesData.json'

import { withAnimalId } from '../../utils/with-animal-id'

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
    const found = animalMastitidesData.find((item) => item.id === params.id)

    if (!found) {
      return HttpResponse.json({} as AnimalMastitisApiResponse, {
        status: HttpStatusCode.notFound,
      })
    }

    return HttpResponse.json(withAnimalId(found, String(params.animalId)), {
      status: HttpStatusCode.ok,
    })
  },
})
