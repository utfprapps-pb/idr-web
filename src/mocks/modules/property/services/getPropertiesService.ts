import { HttpResponse } from 'msw'

import { HttpStatusCode } from '@/data/protocols/http'
import { httpWithMiddleware } from '@/mocks/lib'
import { withAuth, withDelay } from '@/mocks/middleware'
import {
	normalizeQueryFilters,
	paginateData,
	sortData,
	filterData
} from '@/mocks/shared/'

import propertiesData from '../../../../../database/propertiesData.json'

type Params = {
	filter: string
	sort: string
	pagination: string
}

type Property = {
	id: string
	name: string
	city: string
	state: string
	producer: string
}

type Response = {
	properties: Property[]
	totalRegisters: number
}

export const getPropertiesService = httpWithMiddleware<never, Params, Response>(
	{
		routePath: '/api/properties',
		method: 'get',
		middlewares: [withDelay(), withAuth],
		resolver: async ({ request }) => {
			if (!propertiesData.length) {
				return HttpResponse.json(
					{
						properties: [],
						totalRegisters: 0
					},
					{
						status: 404
					}
				)
			}

			const url = new URL(request.url)
			const { pagination, filters, sort } = normalizeQueryFilters(url)

			let filteredData = propertiesData

			if (filters) filteredData = filterData<Property>(filters, filteredData)
			if (sort) filteredData = sortData<Property>(sort, filteredData)
			if (pagination)
				filteredData = paginateData<Property>(pagination, filteredData)

			return HttpResponse.json(
				{
					properties: filteredData,
					totalRegisters: propertiesData.length
				},
				{ status: HttpStatusCode.ok }
			)
		}
	}
)
