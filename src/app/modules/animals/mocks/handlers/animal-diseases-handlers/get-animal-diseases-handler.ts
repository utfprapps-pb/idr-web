import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import {
  normalizeQueryFilters,
  filterData,
  sortData,
  paginateData,
} from '@/core/mocks/utils'

import animalDiseasesData from '@database/animalDiseasesData.json'

import type { AnimalDiseaseModel } from '../../../domain/models/animal-diseases-model'

type Params = {
  filter: string
  sort: string
  pagination: string
}

type Response = {
  animalDiseases: AnimalDiseaseModel[]
  totalRegisters: number
}

export const getAnimalDiseasesHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId'>,
  Params,
  Response
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/diseases',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    if (!animalDiseasesData.length) {
      return HttpResponse.json(
        {
          animalDiseases: [],
          totalRegisters: 0,
        },
        {
          status: 404,
        }
      )
    }

    const url = new URL(request.url)
    const { pagination, filters, sort } = normalizeQueryFilters(url)

    let animalDiseases = animalDiseasesData.map((animalDisease) => ({
      id: animalDisease.id,
      diagnosticDate: new Date(animalDisease.diagnosticDate),
      diagnostic: animalDisease.diagnostic,
    }))

    if (filters)
      animalDiseases = filterData<AnimalDiseaseModel>(filters, animalDiseases)
    if (sort)
      animalDiseases = sortData<AnimalDiseaseModel>(sort, animalDiseases)
    const totalRegisters = animalDiseases.length

    if (pagination)
      animalDiseases = paginateData<AnimalDiseaseModel>(
        pagination,
        animalDiseases
      )

    return HttpResponse.json(
      {
        animalDiseases,
        totalRegisters,
      },
      { status: HttpStatusCode.ok }
    )
  },
})
