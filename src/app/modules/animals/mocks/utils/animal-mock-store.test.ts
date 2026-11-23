import { describe, expect, it } from 'vitest'

import { createAnimalMockStore, isUnknownReference } from './animal-mock-store'

const PROPERTY_ID = 'property-1'

const MOTHER = {
  id: 'mother',
  identifier: 'Mimosa',
  breedId: 'breed-1',
  sizeId: 'size-2',
  gender: 'Fêmea',
  bornCondition: 'Vivo',
  bornDate: '2020-01-10',
  bornWeight: 30,
  animalMotherId: null,
  currentWeight: 450,
  ecc: 3.5,
}

const CALF = {
  ...MOTHER,
  id: 'calf',
  identifier: 'Estrela',
  animalMotherId: 'mother',
}

const BODY = {
  identifier: 'Nova',
  breedId: 'breed-2',
  sizeId: null,
  gender: 'Fêmea',
  animalMotherId: 'mother',
  bornDate: '2024-03-01',
  bornWeight: 32.5,
  bornCondition: null,
}

function findSizeName(sizeId: string) {
  return sizeId === 'size-2' ? 'Média' : null
}

function makeStore() {
  return createAnimalMockStore(
    [MOTHER, CALF],
    (breedId) => (breedId === 'breed-1' ? 'Jersey' : null),
    findSizeName
  )
}

describe('createAnimalMockStore', () => {
  it('lista e busca no formato do GET, com raça, porte e mãe resolvidos', () => {
    const store = makeStore()

    expect(store.list(PROPERTY_ID)).toHaveLength(2)
    expect(store.find(PROPERTY_ID, 'calf')).toEqual({
      ...CALF,
      propertyId: PROPERTY_ID,
      breedName: 'Jersey',
      sizeName: 'Média',
      animalMotherIdentifier: 'Mimosa',
      previousWeight: null,
    })
    expect(store.find(PROPERTY_ID, 'nao-existe')).toBeUndefined()
  })

  it('guarda a edição e responde no formato do PUT, mantendo pesos e ECC', () => {
    const store = makeStore()

    const updated = store.update(PROPERTY_ID, 'calf', BODY)

    expect(updated).toEqual({
      id: 'calf',
      propertyId: PROPERTY_ID,
      ...BODY,
      previousWeight: null,
      currentWeight: 450,
      ecc: 3.5,
    })
    expect(store.find(PROPERTY_ID, 'calf')).toMatchObject({
      identifier: 'Nova',
      breedId: 'breed-2',
      sizeId: null,
      sizeName: null,
      bornCondition: null,
      currentWeight: 450,
    })
  })

  it('reflete na filha o novo identificador da mãe', () => {
    const store = makeStore()

    store.update(PROPERTY_ID, 'mother', { ...BODY, animalMotherId: null })

    expect(store.find(PROPERTY_ID, 'calf')?.animalMotherIdentifier).toBe('Nova')
  })

  it('não edita animal inexistente', () => {
    expect(makeStore().update(PROPERTY_ID, 'nao-existe', BODY)).toBeUndefined()
  })

  it('cria o animal sem medidas e passa a listá-lo', () => {
    const store = makeStore()

    const created = store.create(PROPERTY_ID, BODY)

    expect(created).toEqual({
      id: created.id,
      propertyId: PROPERTY_ID,
      ...BODY,
      previousWeight: null,
      currentWeight: null,
      ecc: null,
    })
    expect(store.find(PROPERTY_ID, created.id)?.animalMotherIdentifier).toBe(
      'Mimosa'
    )
    expect(store.list(PROPERTY_ID)).toHaveLength(3)
  })

  it('a resposta do POST e do PUT não traz o nome do porte, como a API', () => {
    const store = makeStore()

    expect(
      store.create(PROPERTY_ID, { ...BODY, sizeId: 'size-2' })
    ).not.toHaveProperty('sizeName')
  })

  it('remove o animal', () => {
    const store = makeStore()

    expect(store.remove('calf')).toBe(true)
    expect(store.find(PROPERTY_ID, 'calf')).toBeUndefined()
    expect(store.remove('calf')).toBe(false)
  })
})

describe('isUnknownReference', () => {
  it('referência nula é aceita (porte opcional)', () => {
    expect(isUnknownReference(null, findSizeName)).toBe(false)
  })

  it('referência do catálogo é aceita', () => {
    expect(isUnknownReference('size-2', findSizeName)).toBe(false)
  })

  it('referência fora do catálogo é recusada, como a API (400)', () => {
    expect(isUnknownReference('nao-existe', findSizeName)).toBe(true)
  })
})
