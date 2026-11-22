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
  ANIMAL_DEATH_REQUIRED_FIELDS,
  animalDeathsStore,
} from './animal-deaths-store'

import type { AnimalDeathApiRequest } from '../../../data/mappers/animal-death-api-mapper'

export const updateAnimalDeathHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId' | 'id'>,
  AnimalDeathApiRequest,
  object
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/deaths/:id',
  method: 'put',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request, params }) => {
    const body = await request.json()

    const missing = missingRequiredFields(body, ANIMAL_DEATH_REQUIRED_FIELDS)
    if (missing.length > 0) return requiredFieldsProblem(missing)

    const updated = animalDeathsStore.update(
      String(params.animalId),
      String(params.id),
      body
    )

    if (!updated) return notFoundProblem('Óbito não encontrado')

    return HttpResponse.json(updated, { status: HttpStatusCode.ok })
  },
})
