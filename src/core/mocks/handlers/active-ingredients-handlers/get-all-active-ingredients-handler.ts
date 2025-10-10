import { HttpResponse } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'

import allActiveIngredientsData from '@database/allActiveIngredientsData.json'

import { httpWithMiddleware } from '../../lib'
import { withDelay, withAuth } from '../../middleware'
import { filterData } from '../../utils'

import type { MockParams } from '../../types/mock-params-type'
import type { MockResponse } from '../../types/mock-response-type'
import type { ActiveIngredientApiResponse } from '@/core/domain/models/active-ingredients-model'

export const getAllActiveIngredientsHandler = httpWithMiddleware<
  never,
  MockParams<ActiveIngredientApiResponse>,
  MockResponse<ActiveIngredientApiResponse[]>
>({
  routePath: '/api/active-ingredients/search',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const { filters, rows } = await request.json()

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
          status: 404,
        }
      )
    }

    if (filters) {
      const activeIngredients = filterData<ActiveIngredientApiResponse>(
        filters,
        allActiveIngredientsData
      )
      return HttpResponse.json(
        {
          content: activeIngredients,
          numberOfElements: activeIngredients.length,
          pageable: {
            pageSize: rows,
          },
        },
        { status: HttpStatusCode.ok }
      )
    }

    return HttpResponse.json(
      {
        content: allActiveIngredientsData,
        numberOfElements: allActiveIngredientsData.length,
        pageable: {
          pageSize: rows,
        },
      },
      { status: HttpStatusCode.ok }
    )
  },
})
