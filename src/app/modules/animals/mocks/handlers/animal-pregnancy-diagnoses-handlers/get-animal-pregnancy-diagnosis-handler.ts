import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

import animalPregnancyDiagnosesData from '@database/animalPregnancyDiagnosesData.json'

import { withAnimalId } from '../../utils/with-animal-id'

import type { AnimalPregnancyDiagnosisApiResponse } from '../../../domain/models/animal-pregnancy-diagnoses-model'

export const getAnimalPregnancyDiagnosisHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId' | 'id'>,
  never,
  AnimalPregnancyDiagnosisApiResponse
>({
  routePath:
    '/api/properties/:propertyId/animals/:animalId/pregnancy-diagnoses/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    const found = animalPregnancyDiagnosesData.find(
      (item) => item.id === params.id
    )

    if (!found) {
      return HttpResponse.json({} as AnimalPregnancyDiagnosisApiResponse, {
        status: HttpStatusCode.notFound,
      })
    }

    return HttpResponse.json(withAnimalId(found, String(params.animalId)), {
      status: HttpStatusCode.ok,
    })
  },
})
