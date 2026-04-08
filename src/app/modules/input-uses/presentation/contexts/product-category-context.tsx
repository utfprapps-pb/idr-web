import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import type { ProductCategoryModel } from '../../domain/models/product-categories-model'
import type { Filters } from '@/core/domain/types'

export type ProductCategoryContextData = {
  selectedProductCategory: ProductCategoryModel | null
  isOpenNewProductCategoryForm: boolean
  isOpenEditProductCategoryForm: boolean
  isOpenDeleteProductCategoryContainer: boolean
  filters: Filters<ProductCategoryModel>
  openNewProductCategoryForm: () => void
  closeNewProductCategoryForm: () => void
  openEditProductCategoryForm: (productCategory: ProductCategoryModel) => void
  closeEditProductCategoryForm: () => void
  openDeleteProductCategoryContainer: (
    productCategory: ProductCategoryModel
  ) => void
  closeDeleteProductCategoryContainer: () => void
  handleChangeFilters: (newFilters: Filters<ProductCategoryModel>) => void
  clearFilters: () => void
}

export const ProductCategoryContext = createContext<ProductCategoryContextData>(
  {} as ProductCategoryContextData
)

type ProductCategoryProviderProps = {
  children: ReactNode
}

export function ProductCategoryProvider({
  children,
}: ProductCategoryProviderProps) {
  const [selectedProductCategory, setSelectedProductCategory] =
    useState<ProductCategoryModel | null>(null)
  const [isOpenNewProductCategoryForm, setIsOpenNewProductCategoryForm] =
    useState(false)
  const [isOpenEditProductCategoryForm, setIsOpenEditProductCategoryForm] =
    useState(false)
  const [
    isOpenDeleteProductCategoryContainer,
    setIsOpenDeleteProductCategoryContainer,
  ] = useState(false)
  const [filters, setFilters] = useState<Filters<ProductCategoryModel>>({})

  const openNewProductCategoryForm = useCallback(() => {
    setIsOpenNewProductCategoryForm(true)
  }, [])

  const closeNewProductCategoryForm = useCallback(() => {
    setIsOpenNewProductCategoryForm(false)
  }, [])

  const openEditProductCategoryForm = useCallback(
    (productCategory: ProductCategoryModel) => {
      setSelectedProductCategory(productCategory)
      setIsOpenEditProductCategoryForm(true)
    },
    []
  )

  const closeEditProductCategoryForm = useCallback(() => {
    setSelectedProductCategory(null)
    setIsOpenEditProductCategoryForm(false)
  }, [])

  const openDeleteProductCategoryContainer = useCallback(
    (productCategory: ProductCategoryModel) => {
      setSelectedProductCategory(productCategory)
      setIsOpenDeleteProductCategoryContainer(true)
    },
    []
  )

  const closeDeleteProductCategoryContainer = useCallback(() => {
    setSelectedProductCategory(null)
    setIsOpenDeleteProductCategoryContainer(false)
  }, [])

  const handleChangeFilters = useCallback(
    (newFilters: Filters<ProductCategoryModel>) => {
      setFilters((prev) => ({ ...prev, ...newFilters }))
    },
    []
  )

  const clearFilters = useCallback(() => {
    setFilters({})
  }, [])

  const value = useMemo(
    () => ({
      selectedProductCategory,
      isOpenNewProductCategoryForm,
      isOpenEditProductCategoryForm,
      isOpenDeleteProductCategoryContainer,
      filters,
      openNewProductCategoryForm,
      closeNewProductCategoryForm,
      openEditProductCategoryForm,
      closeEditProductCategoryForm,
      openDeleteProductCategoryContainer,
      closeDeleteProductCategoryContainer,
      handleChangeFilters,
      clearFilters,
    }),
    [
      selectedProductCategory,
      isOpenNewProductCategoryForm,
      isOpenEditProductCategoryForm,
      isOpenDeleteProductCategoryContainer,
      filters,
      openNewProductCategoryForm,
      closeNewProductCategoryForm,
      openEditProductCategoryForm,
      closeEditProductCategoryForm,
      openDeleteProductCategoryContainer,
      closeDeleteProductCategoryContainer,
      handleChangeFilters,
      clearFilters,
    ]
  )

  return (
    <ProductCategoryContext.Provider value={value}>
      {children}
    </ProductCategoryContext.Provider>
  )
}
