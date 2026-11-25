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
  ANIMAL_SALE_REQUIRED_FIELDS,
  animalSalesStore,
} from './animal-sales-store'

import type { AnimalSaleApiRequest } from '../../../data/mappers/animal-sale-api-mapper'

export const updateAnimalSaleHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId' | 'id'>,
  AnimalSaleApiRequest,
  object
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/sales/:id',
  method: 'put',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request, params }) => {
    const body = await request.json()

    const missing = missingRequiredFields(body, ANIMAL_SALE_REQUIRED_FIELDS)
    if (missing.length > 0) return requiredFieldsProblem(missing)

    const updated = animalSalesStore.update(
      String(params.animalId),
      String(params.id),
      body
    )

    if (!updated) return notFoundProblem('Venda não encontrada')

    return HttpResponse.json(updated, { status: HttpStatusCode.ok })
  },
})
