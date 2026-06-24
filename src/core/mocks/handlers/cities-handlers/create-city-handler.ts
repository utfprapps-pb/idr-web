import { HttpResponse } from 'msw'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { httpWithMiddleware } from '@/core/mocks/lib'
import { withDelay, withAuth } from '@/core/mocks/middleware'

const MOCK_REGIONS: Record<string, string> = {
  '11111111-1111-1111-1111-111111111111': 'Sudoeste',
  '22222222-2222-2222-2222-222222222222': 'Oeste',
  '33333333-3333-3333-3333-333333333333': 'Metropolitana',
  '44444444-4444-4444-4444-444444444444': 'Norte Central',
  '55555555-5555-5555-5555-555555555555': 'Centro-Sul',
  'b1000000-0000-0000-0000-000000000001': 'Região Norte',
  'b1000000-0000-0000-0000-000000000002': 'Região Sul',
  'b1000000-0000-0000-0000-000000000003': 'Região Leste',
  'b1000000-0000-0000-0000-000000000004': 'Região Oeste',
  'b1000000-0000-0000-0000-000000000005': 'Região Central',
}

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
    const regionName = MOCK_REGIONS[body.regionId] ?? 'Região desconhecida'

    const newCity = {
      id: crypto.randomUUID(),
      name: body.name,
      state: body.state,
      region: { id: body.regionId, name: regionName },
    }

    return HttpResponse.json(newCity, { status: HttpStatusCode.ok })
  },
})
