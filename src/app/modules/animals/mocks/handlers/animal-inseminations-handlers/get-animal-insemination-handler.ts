import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import { notFoundProblem } from '../../utils/event-mock-rules'

import { animalInseminationsStore } from './animal-inseminations-store'

import type { AnimalInseminationApiResponse } from '../../../domain/models/animal-inseminations-model'

export const getAnimalInseminationHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId' | 'id'>,
  never,
  AnimalInseminationApiResponse | object
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/inseminations/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    const found = animalInseminationsStore.find(
      String(params.animalId),
      String(params.id)
    )

    if (!found) return notFoundProblem('Inseminação não encontrada')

    return HttpResponse.json(found, { status: HttpStatusCode.ok })
  },
})
