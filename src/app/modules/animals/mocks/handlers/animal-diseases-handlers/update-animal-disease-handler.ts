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
  ANIMAL_DISEASE_REQUIRED_FIELDS,
  animalDiseasesStore,
} from './animal-diseases-store'

import type { AnimalDiseaseApiRequest } from '../../../data/mappers/animal-disease-api-mapper'

export const updateAnimalDiseaseHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId' | 'id'>,
  AnimalDiseaseApiRequest,
  object
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/diseases/:id',
  method: 'put',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request, params }) => {
    const body = await request.json()

    const missing = missingRequiredFields(body, ANIMAL_DISEASE_REQUIRED_FIELDS)
    if (missing.length > 0) return requiredFieldsProblem(missing)

    const updated = animalDiseasesStore.update(
      String(params.animalId),
      String(params.id),
      body
    )

    if (!updated) return notFoundProblem('Doença não encontrada')

    return HttpResponse.json(updated, { status: HttpStatusCode.ok })
  },
})
