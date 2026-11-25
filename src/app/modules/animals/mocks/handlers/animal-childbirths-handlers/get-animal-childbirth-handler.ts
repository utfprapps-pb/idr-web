import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import { notFoundProblem } from '../../utils/event-mock-rules'
import { toAnimalChildbirthApiResponse } from '../../utils/to-animal-childbirth-api-response'

import { animalChildbirthsStore } from './animal-childbirths-store'

import type { AnimalChildbirthApiResponse } from '../../../domain/models/animal-childbirths-model'

export const getAnimalChildbirthHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId' | 'id'>,
  never,
  AnimalChildbirthApiResponse | object
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/childbirths/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    const found = animalChildbirthsStore.find(
      String(params.animalId),
      String(params.id)
    )

    if (!found) return notFoundProblem('Parto não encontrado')

    return HttpResponse.json(
      toAnimalChildbirthApiResponse(found, String(params.animalId)),
      { status: HttpStatusCode.ok }
    )
  },
})
