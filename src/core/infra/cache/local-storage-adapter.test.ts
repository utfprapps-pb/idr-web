import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { LocalStorageAdapter } from './local-storage-adapter'

/** `localStorage` em memória: os testes rodam no ambiente `node`. */
function makeFakeLocalStorage() {
  const items = new Map<string, string>()

  return {
    items,
    getItem: vi.fn((key: string) => items.get(key) ?? null),
    setItem: vi.fn((key: string, value: string) => {
      items.set(key, String(value))
    }),
    removeItem: vi.fn((key: string) => {
      items.delete(key)
    }),
  }
}

let storage: ReturnType<typeof makeFakeLocalStorage>

beforeEach(() => {
  storage = makeFakeLocalStorage()
  vi.stubGlobal('localStorage', storage)
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('LocalStorageAdapter', () => {
  it('usa chaves distintas para o access token e o refresh token', () => {
    expect(LocalStorageAdapter.LOCAL_STORAGE_KEYS).toEqual({
      AUTH: 'auth',
      REFRESH_TOKEN: 'auth.refresh',
    })
  })

  it('grava e lê um token (string) sem alterá-lo', () => {
    LocalStorageAdapter.set(LocalStorageAdapter.LOCAL_STORAGE_KEYS.AUTH, 'abc')

    expect(storage.items.get('auth')).toBe('abc')
    expect(LocalStorageAdapter.get('auth')).toBe('abc')
  })

  it('devolve null para chave ausente', () => {
    expect(LocalStorageAdapter.get('auth')).toBeNull()
  })

  it('remove a chave quando chamado sem valor (logout)', () => {
    storage.items.set('auth', 'abc')

    LocalStorageAdapter.set('auth')

    expect(storage.removeItem).toHaveBeenCalledWith('auth')
    expect(storage.items.has('auth')).toBe(false)
  })

  it('remove a chave quando o valor é undefined (token ausente na resposta)', () => {
    storage.items.set('auth', 'antigo')

    LocalStorageAdapter.set('auth', undefined)

    expect(storage.items.has('auth')).toBe(false)
  })

  it('serializa objetos como JSON ao gravar', () => {
    LocalStorageAdapter.set('obj', { a: 1 })

    expect(storage.items.get('obj')).toBe('{"a":1}')
  })

  // Bug latente: `get` testa `typeof item === 'object'`, mas `getItem` só
  // devolve string, então o JSON nunca é desserializado. Hoje só se guardam
  // strings (tokens), por isso não há impacto.
  it.fails('lê de volta um objeto gravado como objeto', () => {
    LocalStorageAdapter.set('obj', { a: 1 })

    expect(LocalStorageAdapter.get('obj')).toEqual({ a: 1 })
  })
})
