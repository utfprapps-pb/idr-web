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
  ANIMAL_PURCHASE_REQUIRED_FIELDS,
  animalPurchasesStore,
} from './animal-purchases-store'

import type { AnimalPurchaseApiRequest } from '../../../data/mappers/animal-purchase-api-mapper'

export const updateAnimalPurchaseHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId' | 'id'>,
  AnimalPurchaseApiRequest,
  object
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/purchases/:id',
  method: 'put',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request, params }) => {
    const body = await request.json()

    const missing = missingRequiredFields(body, ANIMAL_PURCHASE_REQUIRED_FIELDS)
    if (missing.length > 0) return requiredFieldsProblem(missing)

    const updated = animalPurchasesStore.update(
      String(params.animalId),
      String(params.id),
      body
    )

    if (!updated) return notFoundProblem('Compra não encontrada')

    return HttpResponse.json(updated, { status: HttpStatusCode.ok })
  },
})
