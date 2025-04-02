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

import animalHeiferCalfStagesData from '@database/animalHeiferCalfStagesData.json'

import type { AnimalHeiferCalfStageModel } from '../../../domain/models/animal-heifer-calf-stages-model'

type Params = {
  filter: string
  sort: string
  pagination: string
}

type Response = {
  animalHeiferCalfStages: AnimalHeiferCalfStageModel[]
  totalRegisters: number
}

export const getAnimalHeiferCalfStagesHandler = httpWithMiddleware<
  PathParams<'propertyId' | 'animalId'>,
  Params,
  Response
>({
  routePath: '/api/properties/:propertyId/animals/:animalId/heifer-calf-stages',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    if (!animalHeiferCalfStagesData.length) {
      return HttpResponse.json(
        {
          animalHeiferCalfStages: [],
          totalRegisters: 0,
        },
        {
          status: 404,
        }
      )
    }

    const url = new URL(request.url)
    const { pagination, filters, sort } = normalizeQueryFilters(url)

    const mappedFilters = {
      ...filters,
      weighingDate: filters?.weighingDate
        ? new Date(filters.weighingDate)
        : undefined,
    }

    let animalHeiferCalfStages =
      animalHeiferCalfStagesData.map(
        (animalHeiferCalfStage) =>
          ({
            ...animalHeiferCalfStage,
            weighingDate: new Date(animalHeiferCalfStage.weighingDate),
          }) as AnimalHeiferCalfStageModel
      ) ?? []

    if (mappedFilters)
      animalHeiferCalfStages = filterData<AnimalHeiferCalfStageModel>(
        mappedFilters,
        animalHeiferCalfStages
      )
    if (sort)
      animalHeiferCalfStages = sortData<AnimalHeiferCalfStageModel>(
        sort,
        animalHeiferCalfStages
      )
    const totalRegisters = animalHeiferCalfStages.length

    if (pagination)
      animalHeiferCalfStages = paginateData<AnimalHeiferCalfStageModel>(
        pagination,
        animalHeiferCalfStages
      )

    return HttpResponse.json(
      {
        animalHeiferCalfStages,
        totalRegisters,
      },
      { status: HttpStatusCode.ok }
    )
  },
})
