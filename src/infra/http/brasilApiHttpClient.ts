import axios, { AxiosResponse } from 'axios'

import { IHttpClient, HttpRequest, HttpResponse } from '@/data/protocols/http'

export const brasilApi = axios.create({
	baseURL: 'https://brasilapi.com.br/api/',
	headers: {
		'Content-Type': 'application/json'
	},
	timeout: 30 * 1000,
	validateStatus: (status: number) => status >= 200 && status < 300
})

export class BrasilApiHttpClient<T = unknown> implements IHttpClient<T> {
	async request(data: HttpRequest): Promise<HttpResponse<T>> {
		let axiosResponse: AxiosResponse

		try {
			axiosResponse = await brasilApi.request({
				...data
			})
		} catch (error: any) {
			axiosResponse = error.response
		}

		return {
			statusCode: axiosResponse.status,
			body: axiosResponse.data
		}
	}
}
