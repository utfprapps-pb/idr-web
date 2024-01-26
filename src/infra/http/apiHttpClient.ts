import axios, { AxiosResponse } from 'axios'

import { IHttpClient, HttpRequest, HttpResponse } from '@/data/protocols/http'
import { env } from '@/main/env'

export const baseApi = axios.create({
	baseURL: env.VITE_API_BASE_URL,
	headers: {
		'Content-Type': 'application/json'
	},
	timeout: 30 * 1000,
	validateStatus: (status: number) => status >= 200 && status < 300
})

export class ApiHttpClient<T = unknown> implements IHttpClient<T> {
	async request(data: HttpRequest): Promise<HttpResponse<T>> {
		let axiosResponse: AxiosResponse

		const { url: rawUrl, pagination, filters } = data

		try {
			const url = this.makeUrlWithFiltersAndPagination({
				url: rawUrl,
				filters,
				pagination
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
			body: axiosResponse.data
		}
	}

	private makeUrlWithFiltersAndPagination(params: {
		url: string
		filters: HttpRequest['filters']
		pagination: HttpRequest['pagination']
	}) {
		const { url, filters = {}, pagination = {} } = params

		const paginationKeys = Object.keys(pagination)
		const filtersKeys = Object.keys(filters)

		if (!filtersKeys.length && !paginationKeys.length) return url

		const esc = encodeURIComponent
		const filtersAndPagination = [
			...Object.entries(pagination).map(
				([key, value]) => `${esc(key)}=${esc(String(value))}`
			),
			...Object.entries(filters).map(
				([key, value]) => `${esc(key)}=${esc(value)}`
			)
		]

		const query = filtersAndPagination.join('&')
		return `${url}?${query}`
	}
}
