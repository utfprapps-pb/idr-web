import { describe, expect, it } from 'vitest'

import { handlers } from './handlers'

type Route = { method: string; path: string; index: number }

function routes(): Route[] {
  return handlers.map((handler, index) => ({
    method: String(handler.info.method).toUpperCase(),
    path: String(handler.info.path),
    index,
  }))
}

/** `/x/:id` registrado antes de `/x/search` captura a busca (o MSW usa o primeiro que casa). */
function searchesShadowedByDetail(): string[] {
  const all = routes().filter((route) => route.method === 'GET')

  return all
    .filter((route) => route.path.endsWith('/search'))
    .flatMap((search) => {
      const base = search.path.slice(0, -'/search'.length)
      const detail = all.find(
        (route) =>
          route.index < search.index &&
          route.path.startsWith(`${base}/:`) &&
          !route.path.slice(base.length + 2).includes('/')
      )
      return detail ? [`${search.path} <- ${detail.path}`] : []
    })
}

describe('handlers do MSW', () => {
  it('nenhuma busca fica atrás do handler de detalhe da mesma rota', () => {
    expect(searchesShadowedByDetail()).toEqual([])
  })
})
