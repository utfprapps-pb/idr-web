import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import {
  missingRequiredFields,
  requiredFieldsProblem,
} from '../../utils/event-mock-rules'

import {
  ANIMAL_MASTITIS_REQUIRED_FIELDS,
  animalMastitidesStore,
} from './animal-mastitides-store'

import type { AnimalMastitisApiRequest } from '../../../data/mappers/animal-mastitis-api-mapper'

export const createAnimalMastitisHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId'>,
  AnimalMastitisApiRequest,
  object
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/mastitides',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request, params }) => {
    const body = await request.json()

    const missing = missingRequiredFields(body, ANIMAL_MASTITIS_REQUIRED_FIELDS)
    if (missing.length > 0) return requiredFieldsProblem(missing)

    const created = animalMastitidesStore.create(String(params.animalId), {
      ...body,
      cmtResult: body.cmtResult ?? null,
    })

    return HttpResponse.json(created, { status: HttpStatusCode.ok })
  },
})
