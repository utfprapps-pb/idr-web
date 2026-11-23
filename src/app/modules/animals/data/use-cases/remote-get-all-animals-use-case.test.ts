import { describe, expect, it } from 'vitest'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { HttpClientSpy } from '@/core/data/test/http-client-spy'
import {
  ForbiddenError,
  NotFoundError,
  UnexpectedError,
} from '@/core/domain/errors'

import { RemoteGetAllAnimalsUseCase } from './remote-get-all-animals-use-case'

import type {
  AnimalApiResponse,
  AnimalModel,
} from '../../domain/models/animals-model'
import type { HttpResponse } from '@/core/data/protocols/http'
import type { SearchApiResponse } from '@/core/domain/types'

type SearchResponse = SearchApiResponse<AnimalApiResponse>

const PROPERTY_ID = 'c0000000-0000-0000-0000-000000000001'

function animal(index: number): AnimalApiResponse {
  return {
    id: `animal-${index}`,
    propertyId: PROPERTY_ID,
    animalMotherId: null,
    animalMotherIdentifier: null,
    breedId: 'breed-1',
    breedName: 'Jersey',
    sizeId: null,
    sizeName: null,
    identifier: `Animal ${index}`,
    gender: null,
    bornCondition: null,
    bornDate: null,
    bornWeight: null,
    previousWeight: null,
    currentWeight: null,
    ecc: null,
  }
}

function page(
  currentPage: number,
  total: number,
  indexes: number[],
  perPage = 2
): HttpResponse<SearchResponse> {
  return {
    statusCode: HttpStatusCode.ok,
    body: { currentPage, perPage, total, items: indexes.map(animal) },
  }
}

function makeSutWithMaxPages(
  maxPages: number,
  ...responses: HttpResponse<SearchResponse>[]
) {
  const httpClientSpy = new HttpClientSpy<
    AnimalModel,
    AnimalApiResponse,
    SearchResponse
  >()
  httpClientSpy.responses = responses

  const sut = new RemoteGetAllAnimalsUseCase(
    '/properties/:propertyId/animals',
    httpClientSpy,
    2,
    maxPages
  )

  return { sut, httpClientSpy }
}

function makeSut(...responses: HttpResponse<SearchResponse>[]) {
  return makeSutWithMaxPages(1000, ...responses)
}

function requestedPages({
  requests,
}: ReturnType<typeof makeSutWithMaxPages>['httpClientSpy']): string[] {
  return requests.map(({ url }) => {
    const [path, query] = url.split('?')
    const search = new URLSearchParams(query)

    expect(path).toBe(`/properties/${PROPERTY_ID}/animals/search`)
    expect(search.get('perPage')).toBe('2')

    return search.get('page') ?? ''
  })
}

describe('RemoteGetAllAnimalsUseCase', () => {
  it('percorre as páginas até juntar o total do rebanho', async () => {
    const { sut, httpClientSpy } = makeSut(
      page(0, 5, [1, 2]),
      page(1, 5, [3, 4]),
      page(2, 5, [5])
    )

    const animals = await sut.execute({ propertyId: PROPERTY_ID })

    expect(requestedPages(httpClientSpy)).toEqual(['0', '1', '2'])
    expect(animals.map(({ id }) => id)).toEqual([
      'animal-1',
      'animal-2',
      'animal-3',
      'animal-4',
      'animal-5',
    ])
    expect(animals[0]).toMatchObject({ name: 'Animal 1', breed: 'Jersey' })
  })

  it('faz uma única busca quando o rebanho cabe na primeira página', async () => {
    const { sut, httpClientSpy } = makeSut(page(0, 2, [1, 2]))

    const animals = await sut.execute({ propertyId: PROPERTY_ID })

    expect(requestedPages(httpClientSpy)).toEqual(['0'])
    expect(animals).toHaveLength(2)
  })

  it('devolve lista vazia sem buscar de novo quando não há animais', async () => {
    const { sut, httpClientSpy } = makeSut(page(0, 0, []))

    expect(await sut.execute({ propertyId: PROPERTY_ID })).toEqual([])
    expect(httpClientSpy.requests).toHaveLength(1)
  })

  it('para numa página vazia mesmo que o total diga que faltam itens', async () => {
    const { sut, httpClientSpy } = makeSut(page(0, 5, [1, 2]), page(1, 5, []))

    const animals = await sut.execute({ propertyId: PROPERTY_ID })

    expect(requestedPages(httpClientSpy)).toEqual(['0', '1'])
    expect(animals).toHaveLength(2)
  })

  it('lança o erro da página que falhar, sem devolver parte do rebanho', async () => {
    const { sut } = makeSut(page(0, 5, [1, 2]), {
      statusCode: HttpStatusCode.serverError,
    })

    await expect(sut.execute({ propertyId: PROPERTY_ID })).rejects.toThrow(
      UnexpectedError
    )
  })

  it('lança erro ao atingir o limite de páginas sem juntar o total, sem devolver parte do rebanho', async () => {
    const { sut, httpClientSpy } = makeSutWithMaxPages(
      2,
      page(0, 6, [1, 2]),
      page(1, 6, [3, 4]),
      page(2, 6, [5, 6])
    )

    await expect(sut.execute({ propertyId: PROPERTY_ID })).rejects.toThrow(
      UnexpectedError
    )
    expect(httpClientSpy.requests).toHaveLength(2)
  })

  it('devolve o rebanho quando o total fecha exatamente na última página permitida', async () => {
    const { sut } = makeSutWithMaxPages(
      2,
      page(0, 4, [1, 2]),
      page(1, 4, [3, 4])
    )

    expect(await sut.execute({ propertyId: PROPERTY_ID })).toHaveLength(4)
  })

  it('traduz 404 e 403 nos erros de domínio', async () => {
    await expect(
      makeSut({ statusCode: HttpStatusCode.notFound }).sut.execute({
        propertyId: PROPERTY_ID,
      })
    ).rejects.toThrow(NotFoundError)

    await expect(
      makeSut({ statusCode: HttpStatusCode.forbidden }).sut.execute({
        propertyId: PROPERTY_ID,
      })
    ).rejects.toThrow(ForbiddenError)
  })
})
