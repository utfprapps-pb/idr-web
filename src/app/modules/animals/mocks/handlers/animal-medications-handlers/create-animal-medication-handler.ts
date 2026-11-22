import { HttpResponse, PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import { toAnimalMedicationApiResponse } from '../../utils/to-animal-medication-api-response'

import type { AnimalMedicationApiRequest } from '../../../data/mappers/animal-medication-api-mapper'
import type { AnimalMedicationApiResponse } from '../../../domain/models/animal-medications-model'

export const createAnimalMedicationHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId'>,
  AnimalMedicationApiRequest,
  AnimalMedicationApiResponse
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/medications',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request, params }) => {
    const body = await request.json()

    return HttpResponse.json(
      toAnimalMedicationApiResponse(
        body,
        crypto.randomUUID(),
        String(params.animalId)
      ),
      { status: HttpStatusCode.ok }
    )
  },
})
