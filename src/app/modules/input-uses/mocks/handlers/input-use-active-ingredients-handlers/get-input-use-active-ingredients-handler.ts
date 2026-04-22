import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'
import { filterData, paginateData, sortData } from '@/core/mocks/utils'

import allActiveIngredientsData from '@database/allActiveIngredientsData.json'

import type { InputUseActiveIngredientApiResponse } from '@/app/modules/input-uses/domain/models/input-use-active-ingredients-model'
import type { MockParams } from '@/core/mocks/types/mock-params-type'
import type { MockResponse } from '@/core/mocks/types/mock-response-type'

export const getInputUseActiveIngredientsHandler = httpWithMiddleware<
  PathParams,
  MockParams<InputUseActiveIngredientApiResponse>,
  MockResponse<InputUseActiveIngredientApiResponse[]>
>({
  routePath: '/api/input-uses/active-ingredients/search',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const { filters, page, rows, sort } = await request.json()

    if (!allActiveIngredientsData.length) {
      return HttpResponse.json(
        {
          content: [],
          numberOfElements: 0,
          pageable: {
            pageSize: 0,
          },
        },
        {
          status: HttpStatusCode.notFound,
        }
      )
    }

    let activeIngredients = allActiveIngredientsData

    if (filters) {
      activeIngredients = filterData<InputUseActiveIngredientApiResponse>(
        filters,
        activeIngredients
      )
    }
    if (sort) {
      activeIngredients = sortData<InputUseActiveIngredientApiResponse>(
        sort,
        activeIngredients
      )
    }

    const numberOfElements = activeIngredients.length
    activeIngredients = paginateData<InputUseActiveIngredientApiResponse>(
      { page, perPage: rows },
      activeIngredients
    )

    return HttpResponse.json(
      {
        content: activeIngredients,
        numberOfElements,
        pageable: {
          pageSize: rows,
        },
      },
      { status: HttpStatusCode.ok }
    )
  },
})
