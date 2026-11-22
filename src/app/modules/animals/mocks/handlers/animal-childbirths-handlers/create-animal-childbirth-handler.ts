import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import {
  missingRequiredFields,
  requiredFieldsProblem,
} from '../../utils/event-mock-rules'
import { toAnimalChildbirthApiResponse } from '../../utils/to-animal-childbirth-api-response'

import {
  ANIMAL_CHILDBIRTH_REQUIRED_FIELDS,
  animalChildbirthsStore,
} from './animal-childbirths-store'

import type { AnimalChildbirthApiRequest } from '../../../data/mappers/animal-childbirth-api-mapper'

export const createAnimalChildbirthHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId'>,
  AnimalChildbirthApiRequest,
  object
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/childbirths',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request, params }) => {
    const body = await request.json()

    const missing = missingRequiredFields(
      body,
      ANIMAL_CHILDBIRTH_REQUIRED_FIELDS
    )
    if (missing.length > 0) return requiredFieldsProblem(missing)

    const created = animalChildbirthsStore.create(String(params.animalId), body)

    return HttpResponse.json(
      toAnimalChildbirthApiResponse(created, String(params.animalId)),
      { status: HttpStatusCode.ok }
    )
  },
})
