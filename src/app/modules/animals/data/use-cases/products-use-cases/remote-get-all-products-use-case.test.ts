import { describe, expect, it } from 'vitest'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { HttpClientSpy } from '@/core/data/test/http-client-spy'
import {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  UnexpectedError,
} from '@/core/domain/errors'

import { RemoteGetAllProductsUseCase } from './remote-get-all-products-use-case'

import type {
  ProductApiResponse,
  ProductModel,
} from '../../../domain/models/products-model'
import type { HttpResponse } from '@/core/data/protocols/http'
import type { SearchApiResponse } from '@/core/domain/types'

type SearchResponse = SearchApiResponse<ProductApiResponse>

function product(
  overrides: Partial<ProductApiResponse> = {}
): ProductApiResponse {
  return {
    id: 'p0000000-0000-0000-0000-000000000001',
    name: 'Ivomec',
    description: 'Antiparasitário injetável',
    activePrinciple: { id: 'ap-1', name: 'Ivermectina' },
    category: { id: 'cat-1', description: 'Antiparasitário' },
    ...overrides,
  }
}

function makeSut(response: HttpResponse<SearchResponse>) {
  const httpClientSpy = new HttpClientSpy<
    ProductModel,
    ProductApiResponse,
    SearchResponse
  >()
  httpClientSpy.response = response

  const sut = new RemoteGetAllProductsUseCase('products', httpClientSpy)

  return { sut, httpClientSpy }
}

describe('RemoteGetAllProductsUseCase', () => {
  it('busca em GET /products/search com o termo e a página da API', async () => {
    const { sut, httpClientSpy } = makeSut({
      statusCode: HttpStatusCode.ok,
      body: { currentPage: 0, perPage: 30, total: 0, items: [] },
    })

    await sut.execute({
      filters: { name: { value: 'ivo', type: 'LIKE' } },
      pagination: { page: 1, perPage: 30 },
    })

    expect(httpClientSpy.requests).toHaveLength(1)

    const { url, method } = httpClientSpy.lastRequest!
    const [path, query] = url.split('?')
    const params = new URLSearchParams(query)

    expect(method).toBe('get')
    expect(path).toBe('products/search')
    expect(params.get('page')).toBe('0')
    expect(params.get('perPage')).toBe('30')
    expect(params.get('terms')).toBe('ivo')
  })

  it('devolve opções com o princípio ativo do catálogo', async () => {
    const { sut } = makeSut({
      statusCode: HttpStatusCode.ok,
      body: { currentPage: 0, perPage: 30, total: 1, items: [product()] },
    })

    const options = await sut.execute({ pagination: { page: 1 } })

    expect(options).toEqual([
      {
        label: 'Ivomec',
        value: 'p0000000-0000-0000-0000-000000000001',
        extraData: { activePrinciple: 'Ivermectina' },
      },
    ])
  })

  it('usa princípio ativo vazio quando o produto não tem um', async () => {
    const { sut } = makeSut({
      statusCode: HttpStatusCode.ok,
      body: {
        currentPage: 0,
        perPage: 30,
        total: 1,
        items: [product({ activePrinciple: null })],
      },
    })

    const [option] = await sut.execute({ pagination: { page: 1 } })

    expect(option?.extraData).toEqual({ activePrinciple: '' })
  })

  it.each([
    [HttpStatusCode.badRequest, BadRequestError],
    [HttpStatusCode.notFound, NotFoundError],
    [HttpStatusCode.forbidden, ForbiddenError],
    [HttpStatusCode.serverError, UnexpectedError],
  ])('responde %s com %o', async (statusCode, error) => {
    const { sut } = makeSut({ statusCode })

    await expect(
      sut.execute({ pagination: { page: 1 } })
    ).rejects.toBeInstanceOf(error)
  })
})
