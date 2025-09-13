import axios, { AxiosResponse } from 'axios'

import {
  HttpClient,
  HttpRequest,
  HttpResponse,
} from '@/core/data/protocols/http'

export const brasilApi = axios.create({
  baseURL: 'https://brasilapi.com.br/api/',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30 * 1000,
  validateStatus: (status: number) => status >= 200 && status < 300,
})

export class BrasilApiHttpClient<
  TModel = unknown,
  TApiModel = unknown,
  TApiResponse = unknown,
> implements HttpClient<TModel, TApiModel, TApiResponse>
{
  async request(
    data: HttpRequest<TModel, TApiModel>
  ): Promise<HttpResponse<TApiResponse>> {
    let axiosResponse: AxiosResponse

    try {
      axiosResponse = await brasilApi.request({
        ...data,
      })
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Request error:', error.message)
      }

      if (!axios.isAxiosError(error) || !error.response) {
        throw error
      }

      axiosResponse = error.response
    }

    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    }
  }
}
