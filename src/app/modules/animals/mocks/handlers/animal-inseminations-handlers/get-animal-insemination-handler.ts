import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

import animalInseminationsData from '@database/animalInseminationsData.json'

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
    if (!animalInseminationsData.length) {
      return HttpResponse.json({} as AnimalInseminationApiResponse, {
        status: 404,
      })
    }

    const animalInseminationFound = animalInseminationsData.find(
      (animal) => animal.id === params.id
    )

    if (!animalInseminationFound) {
      return HttpResponse.json({} as AnimalInseminationApiResponse, {
        status: 404,
      })
    }

    return HttpResponse.json(
      {
        id: animalInseminationFound.id,
        animalId: String(params.animalId),
        iaDate: animalInseminationFound.date,
        bull: animalInseminationFound.sire,
      },
      { status: HttpStatusCode.ok }
    )
  },
})
