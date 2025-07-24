import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

import animalDiseasesData from '@database/animalDiseasesData.json'

import type { AnimalDiseasesDetailsApiResponse } from '../../../domain/models/animal-diseases-model'

export const getAnimalDiseaseHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId' | 'id'>,
  never,
  AnimalDiseasesDetailsApiResponse
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/diseases/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    if (!animalDiseasesData.length) {
      return HttpResponse.json({} as AnimalDiseasesDetailsApiResponse, {
        status: 404,
      })
    }

    const animalDiseaseFound = animalDiseasesData.find(
      (animal) => animal.id === Number(params.id)
    )

    if (!animalDiseaseFound) {
      return HttpResponse.json({} as AnimalDiseasesDetailsApiResponse, {
        status: 404,
      })
    }

    return HttpResponse.json(
      {
        diagnosticDate: animalDiseaseFound.diagnosticDate,
        diagnostic: animalDiseaseFound.diagnostic,
      },
      { status: HttpStatusCode.ok }
    )
  },
})
