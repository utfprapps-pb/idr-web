import { HttpResponse } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

import regionsData from '@database/regionsData.json'

type CreateCityBody = {
  name: string
  state: string
  regionId: string
}

export const createCityHandler = httpWithMiddleware<
  never,
  CreateCityBody,
  never
>({
  routePath: '/api/v1/cities',
  method: 'post',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const body = await request.json()
    const region = regionsData.find((r) => r.id === body.regionId)

    const newCity = {
      id: crypto.randomUUID(),
      name: body.name,
      state: body.state,
      region: {
        id: body.regionId,
        name: region?.description ?? 'Região desconhecida',
      },
    }

    return HttpResponse.json(newCity, { status: HttpStatusCode.ok })
  },
})
