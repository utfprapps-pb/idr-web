import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import { notFoundProblem } from '../../utils/event-mock-rules'

import { animalDeathsStore } from './animal-deaths-store'

import type { AnimalDeathApiResponse } from '../../../domain/models/animal-deaths-model'

export const getAnimalDeathHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId' | 'id'>,
  never,
  AnimalDeathApiResponse | object
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/deaths/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    const found = animalDeathsStore.find(
      String(params.animalId),
      String(params.id)
    )

    if (!found) return notFoundProblem('Óbito não encontrado')

    return HttpResponse.json(found, { status: HttpStatusCode.ok })
  },
})
