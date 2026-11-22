import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import { notFoundProblem } from '../../utils/event-mock-rules'

import { animalDiseasesStore } from './animal-diseases-store'

import type { AnimalDiseaseApiResponse } from '../../../domain/models/animal-diseases-model'

export const getAnimalDiseaseHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId' | 'id'>,
  never,
  AnimalDiseaseApiResponse | object
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/diseases/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    const found = animalDiseasesStore.find(
      String(params.animalId),
      String(params.id)
    )

    if (!found) return notFoundProblem('Doença não encontrada')

    return HttpResponse.json(found, { status: HttpStatusCode.ok })
  },
})
