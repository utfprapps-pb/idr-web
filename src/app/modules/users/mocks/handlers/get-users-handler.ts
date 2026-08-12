import { HttpResponse } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withAuth, withDelay } from '@/core/mocks/middleware'

const MOCK_USERS = [
  {
    id: 'a1b2c3d4-0001-0000-0000-000000000001',
    name: 'Admin Sistema',
    username: 'admin@idr.pr.gov.br',
    cityId: '1',
    active: true,
    role: 'ADMIN',
    createdAt: '2024-01-10T10:00:00Z',
  },
  {
    id: 'a1b2c3d4-0001-0000-0000-000000000002',
    name: 'Coordenador Geral',
    username: 'coordenador@idr.pr.gov.br',
    cityId: '1',
    active: true,
    role: 'COORDENACAO_GERAL',
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'a1b2c3d4-0001-0000-0000-000000000003',
    name: 'Gerente Macro Norte',
    username: 'gerente.macro@idr.pr.gov.br',
    cityId: '2',
    active: true,
    role: 'GERENCIA_MACRO',
    createdAt: '2024-02-01T10:00:00Z',
  },
  {
    id: 'a1b2c3d4-0001-0000-0000-000000000004',
    name: 'Técnico Extensão',
    username: 'tecnico1@idr.pr.gov.br',
    cityId: '3',
    active: true,
    role: 'TECNICO',
    createdAt: '2024-02-10T10:00:00Z',
  },
]

export const getUsersHandler = httpWithMiddleware<never, never, never>({
  routePath: '/api/v1/users/search',
  method: 'get',
  middlewares: [withDelay(), withAuth],
  resolver: async ({ request }) => {
    const url = new URL(request.url)
    const terms = url.searchParams.get('terms') ?? ''
    const page = Number(url.searchParams.get('page') ?? 0)
    const perPage = Number(url.searchParams.get('perPage') ?? 10)

    const filtered = terms
      ? MOCK_USERS.filter(
          (u) =>
            u.name.toLowerCase().includes(terms.toLowerCase()) ||
            u.username.toLowerCase().includes(terms.toLowerCase())
        )
      : MOCK_USERS

    const start = page * perPage
    const content = filtered.slice(start, start + perPage)

    return HttpResponse.json(
      {
        items: content,
        total: filtered.length,
        currentPage: page,
        perPage,
      },
      { status: HttpStatusCode.ok }
    )
  },
})
