import { HttpResponse } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'

import allProductCategoriesData from '@database/allProductCategoriesData.json'

import { httpWithMiddleware } from '../../lib'
import { withDelay, withAuth } from '../../middleware'
import { filterData } from '../../utils'

import type { MockParams } from '../../types/mock-params-type'
import type { MockResponse } from '../../types/mock-response-type'
import type { ProductCategoryApiResponse } from '@/core/domain/models/product-categories-model'

export const getAllProductCategoriesHandler = httpWithMiddleware<
  never,
  MockParams<ProductCategoryApiResponse>,
  MockResponse<ProductCategoryApiResponse[]>
>({
  routePath: '/api/product-categories/search',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const { filters, rows } = await request.json()

    if (!allProductCategoriesData.length) {
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
      const productCategories = filterData<ProductCategoryApiResponse>(
        filters,
        allProductCategoriesData
      )
      return HttpResponse.json(
        {
          content: productCategories,
          numberOfElements: productCategories.length,
          pageable: {
            pageSize: rows,
          },
        },
        { status: HttpStatusCode.ok }
      )
    }

    return HttpResponse.json(
      {
        content: allProductCategoriesData,
        numberOfElements: allProductCategoriesData.length,
        pageable: {
          pageSize: rows,
        },
      },
      { status: HttpStatusCode.ok }
    )
  },
})
