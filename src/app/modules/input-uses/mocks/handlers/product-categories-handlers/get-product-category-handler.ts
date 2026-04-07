import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import productCategoriesData from '@database/productCategoriesData.json'

import type { ProductCategoryApiResponse } from '@/app/modules/input-uses/domain/models/product-categories-model'

export const getProductCategoryHandler = httpWithMiddleware<
  PathParams<'id'>,
  never,
  ProductCategoryApiResponse
>({
  routePath: '/api/product-categories/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    const id = Number(params.id)
    const productCategory = productCategoriesData.find((item) => item.id === id)

    if (!productCategory) {
      return HttpResponse.json({} as ProductCategoryApiResponse, {
        status: HttpStatusCode.notFound,
      })
    }

    return HttpResponse.json(productCategory, { status: HttpStatusCode.ok })
  },
})
