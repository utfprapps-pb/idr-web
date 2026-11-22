import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import {
  missingRequiredFields,
  requiredFieldsProblem,
} from '../../utils/event-mock-rules'

import {
  ANIMAL_PURCHASE_REQUIRED_FIELDS,
  animalPurchasesStore,
} from './animal-purchases-store'

import type { AnimalPurchaseApiRequest } from '../../../data/mappers/animal-purchase-api-mapper'

export const createAnimalPurchaseHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId'>,
  AnimalPurchaseApiRequest,
  object
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/purchases',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request, params }) => {
    const body = await request.json()

    const missing = missingRequiredFields(body, ANIMAL_PURCHASE_REQUIRED_FIELDS)
    if (missing.length > 0) return requiredFieldsProblem(missing)

    const created = animalPurchasesStore.create(String(params.animalId), body)

    return HttpResponse.json(created, { status: HttpStatusCode.ok })
  },
})
