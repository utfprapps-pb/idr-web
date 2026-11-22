import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import {
  missingRequiredFields,
  notFoundProblem,
  requiredFieldsProblem,
} from '../utils/event-mock-rules'

import { ANIMAL_REQUIRED_FIELDS, animalsStore } from './animals-store'

import type { AnimalUpdateApiRequest } from '../../domain/models/animals-model'

export const updateAnimalHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'id'>,
  AnimalUpdateApiRequest,
  object
>({
  routePath: '/api/properties/:propertyId/animals/:id',
  method: 'put',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request, params }) => {
    const body = await request.json()

    const missing = missingRequiredFields(body, ANIMAL_REQUIRED_FIELDS)
    if (missing.length > 0) return requiredFieldsProblem(missing)

    const updated = animalsStore.update(
      String(params.propertyId),
      String(params.id),
      body
    )

    if (!updated) return notFoundProblem('Animal não encontrado')

    return HttpResponse.json(updated, { status: HttpStatusCode.ok })
  },
})
