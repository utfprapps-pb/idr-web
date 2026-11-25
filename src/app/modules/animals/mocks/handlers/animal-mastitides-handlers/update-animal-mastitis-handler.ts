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
  ANIMAL_MASTITIS_REQUIRED_FIELDS,
  animalMastitidesStore,
} from './animal-mastitides-store'

import type { AnimalMastitisApiRequest } from '../../../data/mappers/animal-mastitis-api-mapper'

export const updateAnimalMastitisHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId' | 'id'>,
  AnimalMastitisApiRequest,
  object
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/mastitides/:id',
  method: 'put',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request, params }) => {
    const body = await request.json()

    const missing = missingRequiredFields(body, ANIMAL_MASTITIS_REQUIRED_FIELDS)
    if (missing.length > 0) return requiredFieldsProblem(missing)

    const updated = animalMastitidesStore.update(
      String(params.animalId),
      String(params.id),
      { ...body, cmtResult: body.cmtResult ?? null }
    )

    if (!updated) return notFoundProblem('Mastite não encontrada')

    return HttpResponse.json(updated, { status: HttpStatusCode.ok })
  },
})
