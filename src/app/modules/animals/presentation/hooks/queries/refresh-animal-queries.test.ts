import { QueryClient } from '@tanstack/react-query'
import { describe, expect, it } from 'vitest'

import { refreshAnimalQueries } from './refresh-animal-queries'

const PROPERTY_ID = 'c0000000-0000-0000-0000-000000000001'
const ANIMAL_ID = 'e0000000-0000-0000-0000-000000000002'

function makeClient() {
  const queryClient = new QueryClient()
  queryClient.setQueryData(['animal', PROPERTY_ID, ANIMAL_ID], { name: 'old' })
  queryClient.setQueryData(['animals', PROPERTY_ID, { page: 1 }], [])
  queryClient.setQueryData(['animal', PROPERTY_ID, 'other'], { name: 'x' })
  return queryClient
}

describe('refreshAnimalQueries', () => {
  it('descarta o detalhe salvo para a edição reabrir com o dado do servidor', () => {
    const queryClient = makeClient()

    refreshAnimalQueries(queryClient, PROPERTY_ID, ANIMAL_ID)

    expect(
      queryClient.getQueryData(['animal', PROPERTY_ID, ANIMAL_ID])
    ).toBeUndefined()
    expect(queryClient.getQueryData(['animal', PROPERTY_ID, 'other'])).toEqual({
      name: 'x',
    })
  })

  it('invalida as listas de animais da propriedade', () => {
    const queryClient = makeClient()

    refreshAnimalQueries(queryClient, PROPERTY_ID, ANIMAL_ID)

    expect(
      queryClient.getQueryState(['animals', PROPERTY_ID, { page: 1 }])
        ?.isInvalidated
    ).toBe(true)
  })

  it('na criação, só invalida as listas', () => {
    const queryClient = makeClient()

    refreshAnimalQueries(queryClient, PROPERTY_ID)

    expect(
      queryClient.getQueryData(['animal', PROPERTY_ID, ANIMAL_ID])
    ).toEqual({ name: 'old' })
    expect(
      queryClient.getQueryState(['animals', PROPERTY_ID, { page: 1 }])
        ?.isInvalidated
    ).toBe(true)
  })
})
