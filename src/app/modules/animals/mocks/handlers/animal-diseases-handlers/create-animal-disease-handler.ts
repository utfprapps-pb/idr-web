import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import {
  missingRequiredFields,
  requiredFieldsProblem,
} from '../../utils/event-mock-rules'

import {
  ANIMAL_DISEASE_REQUIRED_FIELDS,
  animalDiseasesStore,
} from './animal-diseases-store'

import type { AnimalDiseaseApiRequest } from '../../../data/mappers/animal-disease-api-mapper'

export const createAnimalDiseaseHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId'>,
  AnimalDiseaseApiRequest,
  object
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/diseases',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request, params }) => {
    const body = await request.json()

    const missing = missingRequiredFields(body, ANIMAL_DISEASE_REQUIRED_FIELDS)
    if (missing.length > 0) return requiredFieldsProblem(missing)

    const created = animalDiseasesStore.create(String(params.animalId), body)

    return HttpResponse.json(created, { status: HttpStatusCode.ok })
  },
})
