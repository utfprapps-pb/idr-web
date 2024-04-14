import { HttpResponse, PathParams } from 'msw'

import { httpWithMiddleware } from '@/mocks/lib'
import { withAuth, withDelay } from '@/mocks/middleware'

export const deletePropertyService = httpWithMiddleware<
	PathParams<string>,
	never,
	never
>({
	routePath: '/api/properties',
	method: 'delete',
	middlewares: [withDelay(), withAuth],
	resolver: async ({ params: id }) =>
		HttpResponse.json(
			{
				id
			},
			{
				status: 204
			}
		)
})
