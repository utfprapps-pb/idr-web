import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import {
  missingRequiredFields,
  requiredFieldsProblem,
} from '../../utils/event-mock-rules'

import {
  ANIMAL_SALE_REQUIRED_FIELDS,
  animalSalesStore,
} from './animal-sales-store'

import type { AnimalSaleApiRequest } from '../../../data/mappers/animal-sale-api-mapper'

export const createAnimalSaleHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId'>,
  AnimalSaleApiRequest,
  object
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/sales',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request, params }) => {
    const body = await request.json()

    const missing = missingRequiredFields(body, ANIMAL_SALE_REQUIRED_FIELDS)
    if (missing.length > 0) return requiredFieldsProblem(missing)

    const created = animalSalesStore.create(String(params.animalId), body)

    return HttpResponse.json(created, { status: HttpStatusCode.ok })
  },
})
