import { HttpResponse } from 'msw'

import { HttpStatusCode } from '@/data/protocols/http'
import { httpWithMiddleware } from '@/mocks/lib'
import { withAuth, withDelay } from '@/mocks/middleware'
import { filterData, normalizeQueryFilters } from '@/mocks/shared'

import allUsersData from '../../../../../database/allUsersData.json'

type Response = {
	id: string
	name: string
}

export const getAllUsersService = httpWithMiddleware<never, never, Response[]>({
	routePath: '/api/users/all',
	method: 'get',
	middlewares: [withDelay(), withAuth],
	resolver: async ({ request }) => {
		if (!allUsersData.length) {
			return HttpResponse.json([], {
				status: 404,
			})
		}

		const url = new URL(request.url)
		const { filters } = normalizeQueryFilters(url)

		if (filters) {
			const filteredData = filterData<Response>(filters, allUsersData)
			return HttpResponse.json(filteredData, { status: HttpStatusCode.ok })
		}

		return HttpResponse.json(allUsersData, { status: HttpStatusCode.ok })
	},
})
