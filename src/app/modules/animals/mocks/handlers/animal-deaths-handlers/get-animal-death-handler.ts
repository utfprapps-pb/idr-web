import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

import animalDeathsData from '@database/animalDeathsData.json'

import { withAnimalId } from '../../utils/with-animal-id'

import type { AnimalDeathApiResponse } from '../../../domain/models/animal-deaths-model'

export const getAnimalDeathHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId' | 'id'>,
  never,
  AnimalDeathApiResponse
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/deaths/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    const found = animalDeathsData.find((item) => item.id === params.id)

    if (!found) {
      return HttpResponse.json({} as AnimalDeathApiResponse, {
        status: HttpStatusCode.notFound,
      })
    }

    return HttpResponse.json(withAnimalId(found, String(params.animalId)), {
      status: HttpStatusCode.ok,
    })
  },
})
