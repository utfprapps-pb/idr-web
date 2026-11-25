import { describe, expect, it } from 'vitest'

import { HttpStatusCode } from '@/core/data/protocols/http'
import { HttpClientSpy } from '@/core/data/test/http-client-spy'

import { RemoteGetAnimalDeathsUseCase } from './remote-get-animal-deaths-use-case'

import type {
  AnimalDeathApiResponse,
  AnimalDeathModel,
} from '../../../domain/models/animal-deaths-model'
import type { SearchApiResponse, Sort } from '@/core/domain/types'

type SearchResponse = SearchApiResponse<AnimalDeathApiResponse>

const PROPERTY_ID = 'c0000000-0000-0000-0000-000000000001'
const ANIMAL_ID = 'e0000000-0000-0000-0000-000000000001'

function makeSut() {
  const httpClientSpy = new HttpClientSpy<
    AnimalDeathModel,
    AnimalDeathApiResponse,
    SearchResponse
  >()
  httpClientSpy.response = {
    statusCode: HttpStatusCode.ok,
    body: {
      currentPage: 0,
      perPage: 10,
      total: 2,
      items: [
        {
          id: 'death-1',
          animalId: ANIMAL_ID,
          reason: 'Pneumonia',
          deathDate: '2024-06-10',
        },
        {
          id: 'death-2',
          animalId: ANIMAL_ID,
          reason: 'Sem data',
          deathDate: null,
        },
      ],
    },
  }

  const sut = new RemoteGetAnimalDeathsUseCase(
    '/properties/:propertyId/animals/:animalId/deaths',
    httpClientSpy
  )

  return { sut, httpClientSpy }
}

async function searchWith(sort: Sort<AnimalDeathModel>) {
  const { sut, httpClientSpy } = makeSut()

  await sut.execute({
    propertyId: PROPERTY_ID,
    animalId: ANIMAL_ID,
    pagination: { page: 1 },
    sort,
  })

  const [path, query] = httpClientSpy.lastRequest!.url.split('?')

  return { path, search: new URLSearchParams(query) }
}

describe('RemoteGetAnimalDeathsUseCase', () => {
  it('ordena pela coluna da API correspondente à da tabela', async () => {
    const { path, search } = await searchWith({
      field: 'date',
      direction: 'desc',
    })

    expect(path).toBe(
      `/properties/${PROPERTY_ID}/animals/${ANIMAL_ID}/deaths/search`
    )
    expect(search.get('sort')).toBe('deathDate')
    expect(search.get('direction')).toBe('desc')
  })

  it('ordena pela causa com o nome do campo na API', async () => {
    const { search } = await searchWith({ field: 'reason', direction: 'asc' })

    expect(search.get('sort')).toBe('reason')
  })

  it('não envia sort para coluna sem campo na API', async () => {
    const { search } = await searchWith({ field: 'id', direction: 'asc' })

    expect(search.has('sort')).toBe(false)
    expect(search.has('direction')).toBe(false)
  })

  it('lista o óbito sem data sem quebrar', async () => {
    const { sut } = makeSut()

    const { resources } = await sut.execute({
      propertyId: PROPERTY_ID,
      animalId: ANIMAL_ID,
      pagination: { page: 1 },
    })

    expect(resources).toEqual([
      { id: 'death-1', reason: 'Pneumonia', date: new Date(2024, 5, 10) },
      { id: 'death-2', reason: 'Sem data', date: null },
    ])
  })
})
