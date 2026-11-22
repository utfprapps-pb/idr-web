import { describe, expect, it } from 'vitest'

import { buildSearchQuery, resolveTerms, toTotalPages } from './search-query'

type Model = { name: string; date: Date; tags: string[] }

describe('buildSearchQuery', () => {
  it('converte a página da tela (1) para a da API (0) e usa 10 por padrão', () => {
    const query = new URLSearchParams(
      buildSearchQuery<Model>({ pagination: undefined })
    )

    expect(query.get('page')).toBe('0')
    expect(query.get('perPage')).toBe('10')
    expect(query.has('terms')).toBe(false)
    expect(query.has('sort')).toBe(false)
  })

  it('envia sort e direction com o campo traduzido para a API', () => {
    const query = new URLSearchParams(
      buildSearchQuery<Model>(
        {
          pagination: { page: 3, perPage: 20 },
          sort: { field: 'name', direction: 'desc' },
        },
        (field) => (field === 'name' ? 'identifier' : undefined)
      )
    )

    expect(query.get('page')).toBe('2')
    expect(query.get('perPage')).toBe('20')
    expect(query.get('sort')).toBe('identifier')
    expect(query.get('direction')).toBe('desc')
  })

  it('não envia ordenação para coluna sem campo na API', () => {
    const query = new URLSearchParams(
      buildSearchQuery<Model>(
        { pagination: undefined, sort: { field: 'tags', direction: 'asc' } },
        () => undefined
      )
    )

    expect(query.has('sort')).toBe(false)
    expect(query.has('direction')).toBe(false)
  })
})

describe('resolveTerms', () => {
  it('usa o primeiro filtro preenchido', () => {
    expect(
      resolveTerms<Model>({
        name: { value: '', type: 'LIKE' },
        tags: { value: ['a', 'b'], type: 'IN' },
      })
    ).toBe('a,b')
  })

  it('envia data como yyyy-MM-dd do dia local', () => {
    expect(
      resolveTerms<Model>({
        date: { value: new Date(2024, 5, 10), type: 'EQUALS' },
      })
    ).toBe('2024-06-10')
  })

  it('não envia terms sem filtro preenchido', () => {
    expect(resolveTerms<Model>(undefined)).toBeUndefined()
    expect(
      resolveTerms<Model>({ tags: { value: [], type: 'IN' } })
    ).toBeUndefined()
  })
})

describe('toTotalPages', () => {
  it('calcula pelo total de registros, não pelos itens da página', () => {
    expect(toTotalPages({ total: 23, perPage: 10 })).toBe(3)
    expect(toTotalPages({ total: 20, perPage: 10 })).toBe(2)
    expect(toTotalPages({ total: 0, perPage: 10 })).toBe(0)
  })

  it('não divide por zero', () => {
    expect(toTotalPages({ total: 5, perPage: 0 })).toBe(0)
  })
})
