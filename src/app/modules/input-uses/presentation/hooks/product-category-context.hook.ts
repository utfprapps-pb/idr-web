import { useContext } from 'react'

import { ProductCategoryContext } from '../contexts/product-category-context'

export function useProductCategoryContext() {
  const context = useContext(ProductCategoryContext)

  if (!context) {
    throw new Error(
      'useProductCategoryContext must be used within a ProductCategoryProvider'
    )
  }

  return context
}
