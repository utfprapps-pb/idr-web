import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import { notFoundProblem } from '../../utils/event-mock-rules'

import { animalPregnancyDiagnosesStore } from './animal-pregnancy-diagnoses-store'

import type { AnimalPregnancyDiagnosisApiResponse } from '../../../domain/models/animal-pregnancy-diagnoses-model'

export const getAnimalPregnancyDiagnosisHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId' | 'id'>,
  never,
  AnimalPregnancyDiagnosisApiResponse | object
>({
  routePath:
    '/api/properties/:propertyId/animals/:animalId/pregnancy-diagnoses/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    const found = animalPregnancyDiagnosesStore.find(
      String(params.animalId),
      String(params.id)
    )

    if (!found) return notFoundProblem('Diagnóstico de gestação não encontrado')

    return HttpResponse.json(found, { status: HttpStatusCode.ok })
  },
})
