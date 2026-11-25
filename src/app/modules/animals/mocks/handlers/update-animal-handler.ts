import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import { isUnknownReference } from '../utils/animal-mock-store'
import {
  missingRequiredFields,
  notFoundProblem,
  requiredFieldsProblem,
  validationProblem,
} from '../utils/event-mock-rules'
import { findAnimalSizeName } from '../utils/find-animal-size-name'

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

    if (isUnknownReference(body.sizeId, findAnimalSizeName))
      return validationProblem(`Porte com o ID ${body.sizeId} não encontrado`)

    const updated = animalsStore.update(
      String(params.propertyId),
      String(params.id),
      body
    )

    if (!updated) return notFoundProblem('Animal não encontrado')

    return HttpResponse.json(updated, { status: HttpStatusCode.ok })
  },
})
