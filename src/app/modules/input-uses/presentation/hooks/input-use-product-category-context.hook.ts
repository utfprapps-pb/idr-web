import { useContext } from 'react'

import { InputUseProductCategoryContext } from '../contexts/input-use-product-category-context'

export function useInputUseProductCategoryContext() {
  const context = useContext(InputUseProductCategoryContext)

  if (!context) {
    throw new Error(
      'useInputUseProductCategoryContext must be used within a InputUseProductCategoryProvider'
    )
  }

  return context
}
