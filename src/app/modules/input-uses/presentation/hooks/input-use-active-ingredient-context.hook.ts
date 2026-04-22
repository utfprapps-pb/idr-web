import { useContext } from 'react'

import { InputUseActiveIngredientContext } from '../contexts/input-use-active-ingredient-context'

export function useInputUseActiveIngredientContext() {
  const context = useContext(InputUseActiveIngredientContext)

  if (!context) {
    throw new Error(
      'useInputUseActiveIngredientContext must be used within an InputUseActiveIngredientProvider'
    )
  }

  return context
}
