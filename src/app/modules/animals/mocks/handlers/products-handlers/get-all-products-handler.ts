import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'
import { parseSearchParams, toSearchResponse } from '@/core/mocks/utils'

import productsData from '@database/productsData.json'

import type { ProductApiResponse } from '../../../domain/models/products-model'

export const getAllProductsHandler = httpWithMiddleware<
  PathParams,
  never,
  never
>({
  routePath: '/api/products/search',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const products: ProductApiResponse[] = productsData

    return HttpResponse.json(
      toSearchResponse(products, parseSearchParams(request)),
      { status: HttpStatusCode.ok }
    )
  },
})
