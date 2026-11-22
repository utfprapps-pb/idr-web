import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import {
  missingRequiredFields,
  requiredFieldsProblem,
} from '../utils/event-mock-rules'

import { ANIMAL_REQUIRED_FIELDS, animalsStore } from './animals-store'

import type { AnimalCreateApiRequest } from '../../domain/models/animals-model'

export const createAnimalHandler = httpWithMiddleware<
  PathParams<'propertyId'>,
  AnimalCreateApiRequest,
  object
>({
  routePath: '/api/properties/:propertyId/animals',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request, params }) => {
    const body = await request.json()

    const missing = missingRequiredFields(body, ANIMAL_REQUIRED_FIELDS)
    if (missing.length > 0) return requiredFieldsProblem(missing)

    return HttpResponse.json(
      animalsStore.create(String(params.propertyId), body),
      { status: HttpStatusCode.ok }
    )
  },
})
