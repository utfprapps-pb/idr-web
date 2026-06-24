import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import inputUseProductCategoriesData from '@database/inputUseProductCategoriesData.json'

import type { InputUseProductCategoryApiResponse } from '@/app/modules/input-uses/domain/models/input-use-product-categories-model'

export const getInputUseProductCategoryHandler = httpWithMiddleware<
  PathParams<'id'>,
  never,
  InputUseProductCategoryApiResponse
>({
  routePath: '/api/input-use-product-categories/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    const id = Number(params.id)
    const inputUseProductCategory = inputUseProductCategoriesData.find(
      (item: InputUseProductCategoryApiResponse) => item.id === id
    )

    if (!inputUseProductCategory) {
      return HttpResponse.json({} as InputUseProductCategoryApiResponse, {
        status: HttpStatusCode.notFound,
      })
    }

    return HttpResponse.json(inputUseProductCategory, {
      status: HttpStatusCode.ok,
    })
  },
})
