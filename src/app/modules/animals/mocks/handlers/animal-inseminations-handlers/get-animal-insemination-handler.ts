import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

import animalInseminationsData from '@database/animalInseminationsData.json'

import { withAnimalId } from '../../utils/with-animal-id'

import type { AnimalInseminationApiResponse } from '../../../domain/models/animal-inseminations-model'

export const getAnimalInseminationHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId' | 'id'>,
  never,
  AnimalInseminationApiResponse
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/inseminations/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    const found = animalInseminationsData.find((item) => item.id === params.id)

    if (!found) {
      return HttpResponse.json({} as AnimalInseminationApiResponse, {
        status: HttpStatusCode.notFound,
      })
    }

    return HttpResponse.json(withAnimalId(found, String(params.animalId)), {
      status: HttpStatusCode.ok,
    })
  },
})
