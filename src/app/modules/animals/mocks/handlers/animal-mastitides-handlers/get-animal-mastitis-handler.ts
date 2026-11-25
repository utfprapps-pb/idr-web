import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import { notFoundProblem } from '../../utils/event-mock-rules'

import { animalMastitidesStore } from './animal-mastitides-store'

import type { AnimalMastitisApiResponse } from '../../../domain/models/animal-mastitides-model'

export const getAnimalMastitisHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId' | 'id'>,
  never,
  AnimalMastitisApiResponse | object
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/mastitides/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    const found = animalMastitidesStore.find(
      String(params.animalId),
      String(params.id)
    )

    if (!found) return notFoundProblem('Mastite não encontrada')

    return HttpResponse.json(found, { status: HttpStatusCode.ok })
  },
})
