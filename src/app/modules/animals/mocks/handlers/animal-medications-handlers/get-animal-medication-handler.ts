import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import { notFoundProblem } from '../../utils/event-mock-rules'

import { animalMedicationsStore } from './animal-medications-store'

import type { AnimalMedicationApiResponse } from '../../../domain/models/animal-medications-model'

export const getAnimalMedicationHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId' | 'id'>,
  never,
  AnimalMedicationApiResponse | object
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/medications/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    const found = animalMedicationsStore.find(
      String(params.animalId),
      String(params.id)
    )

    if (!found) return notFoundProblem('Medicação não encontrada')

    return HttpResponse.json(found, { status: HttpStatusCode.ok })
  },
})
