import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import {
  missingRequiredFields,
  notFoundProblem,
  requiredFieldsProblem,
} from '../../utils/event-mock-rules'

import {
  ANIMAL_PREGNANCY_DIAGNOSIS_REQUIRED_FIELDS,
  animalPregnancyDiagnosesStore,
} from './animal-pregnancy-diagnoses-store'

import type { AnimalPregnancyDiagnosisApiRequest } from '../../../data/mappers/animal-pregnancy-diagnosis-api-mapper'

export const updateAnimalPregnancyDiagnosisHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId' | 'id'>,
  AnimalPregnancyDiagnosisApiRequest,
  object
>({
  routePath:
    '/api/properties/:propertyId/animals/:animalId/pregnancy-diagnoses/:id',
  method: 'put',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request, params }) => {
    const body = await request.json()

    const missing = missingRequiredFields(
      body,
      ANIMAL_PREGNANCY_DIAGNOSIS_REQUIRED_FIELDS
    )
    if (missing.length > 0) return requiredFieldsProblem(missing)

    const updated = animalPregnancyDiagnosesStore.update(
      String(params.animalId),
      String(params.id),
      body
    )

    if (!updated)
      return notFoundProblem('Diagnóstico de gestação não encontrado')

    return HttpResponse.json(updated, { status: HttpStatusCode.ok })
  },
})
