import { useContext } from 'react'

import { InputUseProductContext } from '../contexts/input-use-product-context'

export function useInputUseProductContext() {
  const context = useContext(InputUseProductContext)

  if (!context) {
    throw new Error(
      'useInputUseProductContext must be used within a InputUseProductProvider'
    )
  }

  return context
}
