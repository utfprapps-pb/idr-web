import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

import animalDiseasesData from '@database/animalDiseasesData.json'

import { withAnimalId } from '../../utils/with-animal-id'

import type { AnimalDiseaseApiResponse } from '../../../domain/models/animal-diseases-model'

export const getAnimalDiseaseHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId' | 'id'>,
  never,
  AnimalDiseaseApiResponse
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/diseases/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    const found = animalDiseasesData.find((item) => item.id === params.id)

    if (!found) {
      return HttpResponse.json({} as AnimalDiseaseApiResponse, {
        status: HttpStatusCode.notFound,
      })
    }

    return HttpResponse.json(withAnimalId(found, String(params.animalId)), {
      status: HttpStatusCode.ok,
    })
  },
})
