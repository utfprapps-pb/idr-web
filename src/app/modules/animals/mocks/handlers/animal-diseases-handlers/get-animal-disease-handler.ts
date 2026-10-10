import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

import animalDiseasesData from '@database/animalDiseasesData.json'

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
    if (!animalDiseasesData.length) {
      return HttpResponse.json({} as AnimalDiseaseApiResponse, {
        status: 404,
      })
    }

    const animalDiseaseFound = animalDiseasesData.find(
      (animal) => animal.id === params.id
    )

    if (!animalDiseaseFound) {
      return HttpResponse.json({} as AnimalDiseaseApiResponse, {
        status: 404,
      })
    }

    return HttpResponse.json(
      {
        id: animalDiseaseFound.id,
        animalId: String(params.animalId),
        diagnosisDate: animalDiseaseFound.diagnosticDate,
        diagnosis: animalDiseaseFound.diagnostic,
      },
      { status: HttpStatusCode.ok }
    )
  },
})
