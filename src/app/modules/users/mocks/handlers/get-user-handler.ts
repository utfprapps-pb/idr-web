import { HttpResponse, type PathParams } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

export const getUserHandler = httpWithMiddleware<
  PathParams<'userId'>,
  never,
  never
>({
  routePath: '/api/v1/users/:userId',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ params }) => {
    const { userId } = params

    return HttpResponse.json(
      {
        id: userId,
        name: 'Usuário Teste',
        username: 'usuario@idr.pr.gov.br',
        cpf: '111.111.111-11',
        phone: '(41) 99999-9999',
        cityId: '1',
        active: true,
        createdAt: '2024-01-10T10:00:00Z',
        role: 'GERENCIA_MACRO',
        readOnly: false,
        regionIds: ['r1b2c3d4-0001-0000-0000-000000000001'],
        cityIds: [],
      },
      { status: HttpStatusCode.ok }
    )
  },
})
