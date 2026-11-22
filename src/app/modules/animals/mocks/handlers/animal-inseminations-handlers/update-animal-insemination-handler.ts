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
  ANIMAL_INSEMINATION_REQUIRED_FIELDS,
  animalInseminationsStore,
} from './animal-inseminations-store'

import type { AnimalInseminationApiRequest } from '../../../data/mappers/animal-insemination-api-mapper'

export const updateAnimalInseminationHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId' | 'id'>,
  AnimalInseminationApiRequest,
  object
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/inseminations/:id',
  method: 'put',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request, params }) => {
    const body = await request.json()

    const missing = missingRequiredFields(
      body,
      ANIMAL_INSEMINATION_REQUIRED_FIELDS
    )
    if (missing.length > 0) return requiredFieldsProblem(missing)

    const updated = animalInseminationsStore.update(
      String(params.animalId),
      String(params.id),
      body
    )

    if (!updated) return notFoundProblem('Inseminação não encontrada')

    return HttpResponse.json(updated, { status: HttpStatusCode.ok })
  },
})
