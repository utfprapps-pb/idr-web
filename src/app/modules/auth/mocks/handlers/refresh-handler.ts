import { faker } from '@faker-js/faker'
import { HttpResponse } from 'msw'

import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay } from '@/core/mocks/middleware'
import { problemResponse } from '@/core/mocks/utils'

type Params = {
  token: string
}

type Response = {
  accessToken: string
  refreshToken: string
}

export const refreshHandler = httpWithMiddleware<
  never,
  Params,
  Response | object
>({
  routePath: '/api/v1/auth/refresh',
  method: 'post',
  middlewares: [withDelay()],
  resolver: async ({ request }) => {
    const { token } = await request.json()

    if (token) {
      return HttpResponse.json({
        accessToken: faker.string.uuid(),
        refreshToken: faker.string.uuid(),
      })
    }

    return problemResponse(
      400,
      'refresh-token-invalido',
      'Sessão expirada',
      'Refresh token não encontrado.'
    )
  },
})
