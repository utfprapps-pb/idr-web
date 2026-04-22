import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import allActiveIngredientsData from '@database/allActiveIngredientsData.json'

import type { InputUseActiveIngredientApiResponse } from '@/app/modules/input-uses/domain/models/input-use-active-ingredients-model'

export const getInputUseActiveIngredientHandler = httpWithMiddleware<
  PathParams<'id'>,
  never,
  InputUseActiveIngredientApiResponse
>({
  routePath: '/api/input-uses/active-ingredients/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    const id = Number(params.id)
    const activeIngredient = allActiveIngredientsData.find(
      (item) => item.id === id
    )

    if (!activeIngredient) {
      return HttpResponse.json({} as InputUseActiveIngredientApiResponse, {
        status: HttpStatusCode.notFound,
      })
    }

    return HttpResponse.json(activeIngredient, { status: HttpStatusCode.ok })
  },
})
