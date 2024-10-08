import { HttpResponse, PathParams } from 'msw'

import { HttpStatusCode } from '@/data/protocols/http'
import { httpWithMiddleware } from '@/mocks/lib'
import { withAuth, withDelay } from '@/mocks/middleware'

export const updatePropertyService = httpWithMiddleware<
	PathParams<'id'>,
	never,
	never
>({
	routePath: '/api/properties/:id',
	method: 'patch',
	middlewares: [withDelay(), withAuth],
	resolver: async () =>
		HttpResponse.json(undefined, { status: HttpStatusCode.noContent })
})
