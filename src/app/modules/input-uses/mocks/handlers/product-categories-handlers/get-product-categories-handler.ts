import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'
import { filterData, paginateData, sortData } from '@/core/mocks/utils'

import productCategoriesData from '@database/productCategoriesData.json'

import type { ProductCategoryApiResponse } from '@/app/modules/input-uses/domain/models/product-categories-model'
import type { MockParams } from '@/core/mocks/types/mock-params-type'
import type { MockResponse } from '@/core/mocks/types/mock-response-type'

export const getProductCategoriesHandler = httpWithMiddleware<
  PathParams,
  MockParams<ProductCategoryApiResponse>,
  MockResponse<ProductCategoryApiResponse[]>
>({
  routePath: '/api/product-categories/search',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const { filters, page, rows, sort } = await request.json()

    if (!productCategoriesData.length) {
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

    let productCategories = productCategoriesData

    if (filters) {
      productCategories = filterData<ProductCategoryApiResponse>(
        filters,
        productCategories
      )
    }
    if (sort) {
      productCategories = sortData<ProductCategoryApiResponse>(
        sort,
        productCategories
      )
    }

    const numberOfElements = productCategories.length
    productCategories = paginateData<ProductCategoryApiResponse>(
      { page, perPage: rows },
      productCategories
    )

    return HttpResponse.json(
      {
        content: productCategories,
        numberOfElements,
        pageable: {
          pageSize: rows,
        },
      },
      { status: HttpStatusCode.ok }
    )
  },
})
