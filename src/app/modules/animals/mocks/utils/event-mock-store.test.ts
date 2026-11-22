import { describe, expect, it } from 'vitest'

import { createEventMockStore } from './event-mock-store'

type Record = { id: string; note: string }

function makeStore() {
  return createEventMockStore<Record>([
    { id: 'seed-1', note: 'seed 1' },
    { id: 'seed-2', note: 'seed 2' },
  ])
}

describe('createEventMockStore', () => {
  it('lista o seed em qualquer animal, com o animalId da rota', () => {
    expect(makeStore().list('animal-a')).toEqual([
      { id: 'seed-1', note: 'seed 1', animalId: 'animal-a' },
      { id: 'seed-2', note: 'seed 2', animalId: 'animal-a' },
    ])
  })

  it('guarda o criado só no animal que o recebeu', () => {
    const store = makeStore()

    const created = store.create('animal-a', { note: 'novo' })

    expect(store.find('animal-a', created.id)).toEqual({
      id: created.id,
      note: 'novo',
      animalId: 'animal-a',
    })
    expect(store.list('animal-a')).toHaveLength(3)
    expect(store.list('animal-b')).toHaveLength(2)
    expect(store.find('animal-b', created.id)).toBeUndefined()
  })

  it('guarda a edição: reabrir devolve o gravado', () => {
    const store = makeStore()

    const updated = store.update('animal-a', 'seed-1', { note: 'editado' })

    expect(updated).toEqual({
      id: 'seed-1',
      note: 'editado',
      animalId: 'animal-a',
    })
    expect(store.find('animal-a', 'seed-1')?.note).toBe('editado')
    expect(store.list('animal-a')[0]?.note).toBe('editado')
  })

  it('não edita registro inexistente', () => {
    expect(
      makeStore().update('animal-a', 'nao-existe', { note: 'x' })
    ).toBeUndefined()
  })

  it('remove o registro', () => {
    const store = makeStore()

    expect(store.remove('animal-a', 'seed-1')).toBe(true)
    expect(store.find('animal-a', 'seed-1')).toBeUndefined()
    expect(store.remove('animal-a', 'seed-1')).toBe(false)
  })
})
