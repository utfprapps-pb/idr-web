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
  toAnimalMedicationRecord,
  unknownProductProblem,
} from '../../utils/to-animal-medication-api-response'

import {
  ANIMAL_MEDICATION_REQUIRED_FIELDS,
  animalMedicationsStore,
} from './animal-medications-store'

import type { AnimalMedicationApiRequest } from '../../../data/mappers/animal-medication-api-mapper'

export const updateAnimalMedicationHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId' | 'id'>,
  AnimalMedicationApiRequest,
  object
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/medications/:id',
  method: 'put',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request, params }) => {
    const body = await request.json()

    const missing = missingRequiredFields(
      body,
      ANIMAL_MEDICATION_REQUIRED_FIELDS
    )
    if (missing.length > 0) return requiredFieldsProblem(missing)

    const productProblem = unknownProductProblem(body.productId)
    if (productProblem) return productProblem

    const updated = animalMedicationsStore.update(
      String(params.animalId),
      String(params.id),
      toAnimalMedicationRecord(body)
    )

    if (!updated) return notFoundProblem('Medicação não encontrada')

    return HttpResponse.json(updated, { status: HttpStatusCode.ok })
  },
})
