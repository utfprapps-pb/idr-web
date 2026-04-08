import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'
import { filterData, paginateData, sortData } from '@/core/mocks/utils'

import inputUseProductCategoriesData from '@database/inputUseProductCategoriesData.json'

import type { InputUseProductCategoryApiResponse } from '@/app/modules/input-uses/domain/models/input-use-product-categories-model'
import type { MockParams } from '@/core/mocks/types/mock-params-type'
import type { MockResponse } from '@/core/mocks/types/mock-response-type'

export const getInputUseProductCategoriesHandler = httpWithMiddleware<
  PathParams,
  MockParams<InputUseProductCategoryApiResponse>,
  MockResponse<InputUseProductCategoryApiResponse[]>
>({
  routePath: '/api/input-use-product-categories/search',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const { filters, page, rows, sort } = await request.json()

    if (!inputUseProductCategoriesData.length) {
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

    let inputUseProductCategories = inputUseProductCategoriesData

    if (filters) {
      inputUseProductCategories =
        filterData<InputUseProductCategoryApiResponse>(
          filters,
          inputUseProductCategories
        )
    }
    if (sort) {
      inputUseProductCategories = sortData<InputUseProductCategoryApiResponse>(
        sort,
        inputUseProductCategories
      )
    }

    const numberOfElements = inputUseProductCategories.length
    inputUseProductCategories =
      paginateData<InputUseProductCategoryApiResponse>(
        { page, perPage: rows },
        inputUseProductCategories
      )

    return HttpResponse.json(
      {
        content: inputUseProductCategories,
        numberOfElements,
        pageable: {
          pageSize: rows,
        },
      },
      { status: HttpStatusCode.ok }
    )
  },
})
