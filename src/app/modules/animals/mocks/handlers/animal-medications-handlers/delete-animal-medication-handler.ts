import { HttpResponse, type PathParams } from 'msw'

import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import { notFoundProblem } from '../../utils/event-mock-rules'

import { animalMedicationsStore } from './animal-medications-store'

export const deleteAnimalMedicationHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId' | 'id'>,
  never,
  object
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/medications/:id',
  method: 'delete',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    if (
      !animalMedicationsStore.remove(String(params.animalId), String(params.id))
    ) {
      return notFoundProblem('Medicação não encontrada')
    }

    return HttpResponse.json(undefined, { status: 204 })
  },
})
