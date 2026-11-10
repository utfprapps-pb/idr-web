import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

import animalChildbirthsData from '@database/animalChildbirthsData.json'

import { toAnimalChildbirthApiResponse } from '../../utils/to-animal-childbirth-api-response'

import type { AnimalChildbirthApiResponse } from '../../../domain/models/animal-childbirths-model'

export const getAnimalChildbirthHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId' | 'id'>,
  never,
  AnimalChildbirthApiResponse
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/childbirths/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    const found = animalChildbirthsData.find((item) => item.id === params.id)

    if (!found) {
      return HttpResponse.json({} as AnimalChildbirthApiResponse, {
        status: HttpStatusCode.notFound,
      })
    }

    return HttpResponse.json(
      toAnimalChildbirthApiResponse(found, String(params.animalId)),
      {
        status: HttpStatusCode.ok,
      }
    )
  },
})
