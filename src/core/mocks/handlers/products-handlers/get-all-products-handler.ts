import { HttpResponse } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'

import allProductsData from '@database/allProductsData.json'

import { httpWithMiddleware } from '../../lib'
import { withDelay, withAuth } from '../../middleware'
import { filterData } from '../../utils'

import type { MockParams } from '../../types/mock-params-type'
import type { MockResponse } from '../../types/mock-response-type'
import type { ProductApiResponse } from '@/core/domain/models/products-model'

export const getAllProductsHandler = httpWithMiddleware<
  never,
  MockParams<ProductApiResponse>,
  MockResponse<ProductApiResponse[]>
>({
  routePath: '/api/products/search',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const { filters, rows } = await request.json()

    if (!allProductsData.length) {
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
      const products = filterData<ProductApiResponse>(filters, allProductsData)
      return HttpResponse.json(
        {
          content: products,
          numberOfElements: products.length,
          pageable: {
            pageSize: rows,
          },
        },
        { status: HttpStatusCode.ok }
      )
    }

    return HttpResponse.json(
      {
        content: allProductsData,
        numberOfElements: allProductsData.length,
        pageable: {
          pageSize: rows,
        },
      },
      { status: HttpStatusCode.ok }
    )
  },
})
