import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import {
  missingRequiredFields,
  requiredFieldsProblem,
} from '../../utils/event-mock-rules'

import {
  ANIMAL_DEATH_REQUIRED_FIELDS,
  animalDeathsStore,
} from './animal-deaths-store'

import type { AnimalDeathApiRequest } from '../../../data/mappers/animal-death-api-mapper'

export const createAnimalDeathHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId'>,
  AnimalDeathApiRequest,
  object
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/deaths',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request, params }) => {
    const body = await request.json()

    const missing = missingRequiredFields(body, ANIMAL_DEATH_REQUIRED_FIELDS)
    if (missing.length > 0) return requiredFieldsProblem(missing)

    const created = animalDeathsStore.create(String(params.animalId), body)

    return HttpResponse.json(created, { status: HttpStatusCode.ok })
  },
})
