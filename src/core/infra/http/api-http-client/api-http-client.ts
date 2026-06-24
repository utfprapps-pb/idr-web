import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios'

import {
  HttpClient,
  HttpRequest,
  HttpResponse,
} from '@/core/data/protocols/http'
import { env } from '@/core/env'
import { LocalStorageAdapter } from '@/core/infra/cache'

import { authInterceptorRequest } from './interceptors/auth-interceptor'

import type { ApiSort, NestedKeyOf } from '@/core/domain/types'

type ApiFilterTriplet<TApiModel> = {
  field: NestedKeyOf<TApiModel extends object ? TApiModel : object>
  value: unknown
  type: string
}

export const ITEMS_PER_PAGE = 10

export const baseApi = axios.create({
  baseURL: env.VITE_API_MOCKED ? '/api' : env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30 * 1000,
  validateStatus: (status: number) => status >= 200 && status < 300,
})
const refreshBaseApi = axios.create({
  baseURL: baseApi.defaults.baseURL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30 * 1000,
})

function clearTokensAndNotify() {
  LocalStorageAdapter.set(LocalStorageAdapter.LOCAL_STORAGE_KEYS.AUTH)
  LocalStorageAdapter.set(LocalStorageAdapter.LOCAL_STORAGE_KEYS.REFRESH_TOKEN)
  window.dispatchEvent(new Event('auth:token-expired'))
}

baseApi.interceptors.request.use(authInterceptorRequest)
baseApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!axios.isAxiosError(error)) return Promise.reject(error)
    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & { retry?: boolean })
      | undefined
    if (!originalRequest) return Promise.reject(error)
    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest.retry
    ) {
      originalRequest.retry = true
      const refreshToken = LocalStorageAdapter.get(
        LocalStorageAdapter.LOCAL_STORAGE_KEYS.REFRESH_TOKEN
      )
      if (!refreshToken) {
        clearTokensAndNotify()
        return Promise.reject(error)
      }
      try {
        const { data } = await refreshBaseApi.post<{
          accessToken: string
          refreshToken: string
        }>('v1/auth/refresh', { token: refreshToken })
        LocalStorageAdapter.set(
          LocalStorageAdapter.LOCAL_STORAGE_KEYS.AUTH,
          data.accessToken
        )
        LocalStorageAdapter.set(
          LocalStorageAdapter.LOCAL_STORAGE_KEYS.REFRESH_TOKEN,
          data.refreshToken
        )
        originalRequest.headers.Authorization = `Bearer ${data.accessToken}`
        return baseApi(originalRequest)
      } catch {
        clearTokensAndNotify()
        return Promise.reject(error)
      }
    }
    return Promise.reject(error)
  }
)

export class ApiHttpClient<
  TModel = unknown,
  TApiModel = unknown,
  TApiResponse = unknown,
> implements HttpClient<TModel, TApiModel, TApiResponse>
{
  async request(
    data: HttpRequest<TModel, TApiModel>
  ): Promise<HttpResponse<TApiResponse>> {
    let axiosResponse: AxiosResponse

    const { url, pagination, filters, sort, mapApiProperties } = data

    const filtersArray = filters
      ? (Object.keys(filters) as Array<keyof TModel>)
          .filter((field) => {
            const filter = filters[field]
            if (!filter) return false

            const { value } = filter
            return value !== undefined && value !== null && value !== ''
          })
          .reduce<Array<ApiFilterTriplet<TApiModel>>>((acc, field) => {
            const filter = filters[field]
            if (!filter) return acc

            const { value, type = 'LIKE' } = filter

            if (!mapApiProperties || !(field in mapApiProperties)) {
              return acc
            }

            const mappedField = mapApiProperties[
              field
            ] as ApiFilterTriplet<TApiModel>['field']

            if (value instanceof Date) {
              acc.push({
                field: mappedField,
                value: value.toISOString(),
                type,
              })
              return acc
            }

            if (Array.isArray(value)) {
              acc.push({
                field: mappedField,
                value: value.map((item) =>
                  item instanceof Date ? item.toISOString() : item
                ),
                type,
              })
              return acc
            }

            acc.push({
              field: mappedField,
              value,
              type,
            })

            return acc
          }, [])
      : undefined

    const sortInfo: ApiSort<TApiModel> | undefined =
      sort && mapApiProperties && sort.field in mapApiProperties
        ? {
            type: sort.direction,
            field: mapApiProperties[sort.field] as keyof TApiModel,
          }
        : undefined

    try {
      axiosResponse = await baseApi.request({
        ...data,
        url,
        data: {
          ...(typeof data.body === 'object' && data.body !== null
            ? data.body
            : {}),
          ...(pagination
            ? {
                page: pagination.page - 1,
                rows: pagination.perPage ?? ITEMS_PER_PAGE,
              }
            : {}),
          ...(sortInfo ? { sort: sortInfo } : {}),
          ...(filtersArray && filtersArray.length > 0
            ? { filters: filtersArray }
            : {}),
        },
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
