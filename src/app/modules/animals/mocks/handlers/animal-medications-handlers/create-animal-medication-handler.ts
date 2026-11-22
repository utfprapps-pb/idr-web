import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import {
  missingRequiredFields,
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

export const createAnimalMedicationHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId'>,
  AnimalMedicationApiRequest,
  object
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/medications',
  method: 'post',
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

    const created = animalMedicationsStore.create(
      String(params.animalId),
      toAnimalMedicationRecord(body)
    )

    return HttpResponse.json(created, { status: HttpStatusCode.ok })
  },
})
