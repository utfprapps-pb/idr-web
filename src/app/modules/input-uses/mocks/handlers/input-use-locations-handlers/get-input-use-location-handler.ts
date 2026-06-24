import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import inputUseLocationsData from '@database/inputUseLocationsData.json'

import type {
  InputUseLocationApiResponse,
  InputUseLocationDetailsApiResponse,
} from '@/app/modules/input-uses/domain/models/input-use-locations-model'

export const getInputUseLocationHandler = httpWithMiddleware<
  PathParams<'id'>,
  never,
  InputUseLocationApiResponse
>({
  routePath: '/api/input-uses/locations/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    const id = Number(params.id)
    const inputUseLocation = inputUseLocationsData.find(
      (item: InputUseLocationDetailsApiResponse) => item.id === id
    )

    if (!inputUseLocation) {
      return HttpResponse.json({} as InputUseLocationApiResponse, {
        status: HttpStatusCode.notFound,
      })
    }

    return HttpResponse.json(inputUseLocation, { status: HttpStatusCode.ok })
  },
})
