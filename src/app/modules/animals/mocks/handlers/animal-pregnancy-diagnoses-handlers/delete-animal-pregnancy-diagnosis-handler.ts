import { HttpResponse, type PathParams } from 'msw'

import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import { notFoundProblem } from '../../utils/event-mock-rules'

import { animalPregnancyDiagnosesStore } from './animal-pregnancy-diagnoses-store'

export const deleteAnimalPregnancyDiagnosisHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId' | 'id'>,
  never,
  object
>({
  routePath:
    '/api/properties/:propertyId/animals/:animalId/pregnancy-diagnoses/:id',
  method: 'delete',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    if (
      !animalPregnancyDiagnosesStore.remove(
        String(params.animalId),
        String(params.id)
      )
    ) {
      return notFoundProblem('Diagnóstico de gestação não encontrado')
    }

    return HttpResponse.json(undefined, { status: 204 })
  },
})
