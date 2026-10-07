import { HttpResponse } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

import regionsData from '@database/regionsData.json'

type RegionItem = { id: string; description: string }

export const getRegionHandler = httpWithMiddleware<
  { id: string },
  never,
  RegionItem
>({
  routePath: '/api/v1/regions/:id',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    const region = (regionsData as RegionItem[]).find((r) => r.id === params.id)

    if (!region) {
      return HttpResponse.json({} as RegionItem, {
        status: HttpStatusCode.notFound,
      })
    }

    return HttpResponse.json(region, { status: HttpStatusCode.ok })
  },
})
