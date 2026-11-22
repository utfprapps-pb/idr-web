import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import {
  missingRequiredFields,
  requiredFieldsProblem,
} from '../../utils/event-mock-rules'

import {
  ANIMAL_INSEMINATION_REQUIRED_FIELDS,
  animalInseminationsStore,
} from './animal-inseminations-store'

import type { AnimalInseminationApiRequest } from '../../../data/mappers/animal-insemination-api-mapper'

export const createAnimalInseminationHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId'>,
  AnimalInseminationApiRequest,
  object
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/inseminations',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request, params }) => {
    const body = await request.json()

    const missing = missingRequiredFields(
      body,
      ANIMAL_INSEMINATION_REQUIRED_FIELDS
    )
    if (missing.length > 0) return requiredFieldsProblem(missing)

    const created = animalInseminationsStore.create(
      String(params.animalId),
      body
    )

    return HttpResponse.json(created, { status: HttpStatusCode.ok })
  },
})
