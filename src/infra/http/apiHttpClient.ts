import axios, { AxiosResponse } from 'axios'

import { IHttpClient, HttpRequest, HttpResponse } from '@/data/protocols/http'
import { env } from '@/main/env'

export const ITEMS_PER_PAGE = 10

export const baseApi = axios.create({
	baseURL: env.VITE_API_MOCKED ? 'api/' : env.VITE_API_BASE_URL,
	headers: {
		'Content-Type': 'application/json'
	},
	timeout: 30 * 1000,
	validateStatus: (status: number) => status >= 200 && status < 300
})

export class ApiHttpClient<TBody = unknown> implements IHttpClient<TBody> {
	async request(data: HttpRequest): Promise<HttpResponse<TBody>> {
		let axiosResponse: AxiosResponse

		const { url: rawUrl, pagination, filters, sort } = data

		try {
			const url = this.makeUrlWithFiltersAndPagination({
				url: rawUrl,
				filters,
				pagination,
				sort
			})

			axiosResponse = await baseApi.request({
				...data,
				url,
				data: data.body
			})
		} catch (error: any) {
			axiosResponse = error.response
		}

		return {
			statusCode: axiosResponse.status,
			body: axiosResponse.data,
			itemsPerPage: pagination?.perPage ?? ITEMS_PER_PAGE
		}
	}

	private makeUrlWithFiltersAndPagination({
		url,
		filters,
		pagination,
		sort
	}: Pick<HttpRequest, 'url' | 'filters' | 'pagination' | 'sort'>) {
		if (!pagination && !filters && !sort) return url

		const query = {
			filters: filters ?? {},
			pagination: pagination
				? {
						...pagination,
						perPage: pagination?.perPage ? pagination.perPage : ITEMS_PER_PAGE
					}
				: {},
			sort: sort ?? {}
		}

		const parsedQuery = Object.entries(query)
			.map(([key, value]) => {
				if (typeof value === 'object' && Object.keys(value).length === 0) {
					return `${encodeURIComponent(key)}=`
				}
				return `${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(value))}`
			})
			.join('&')

		return `${url}?${parsedQuery}`
	}
}
