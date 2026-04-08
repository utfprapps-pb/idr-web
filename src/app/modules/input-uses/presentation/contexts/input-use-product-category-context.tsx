import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import type { InputUseProductCategoryModel } from '../../domain/models/input-use-product-categories-model'
import type { Filters } from '@/core/domain/types'

export type InputUseProductCategoryContextData = {
  selectedInputUseProductCategory: InputUseProductCategoryModel | null
  isOpenNewInputUseProductCategoryForm: boolean
  isOpenEditInputUseProductCategoryForm: boolean
  isOpenDeleteInputUseProductCategoryContainer: boolean
  filters: Filters<InputUseProductCategoryModel>
  openNewInputUseProductCategoryForm: () => void
  closeNewInputUseProductCategoryForm: () => void
  openEditInputUseProductCategoryForm: (
    inputUseProductCategory: InputUseProductCategoryModel
  ) => void
  closeEditInputUseProductCategoryForm: () => void
  openDeleteInputUseProductCategoryContainer: (
    inputUseProductCategory: InputUseProductCategoryModel
  ) => void
  closeDeleteInputUseProductCategoryContainer: () => void
  handleChangeFilters: (
    newFilters: Filters<InputUseProductCategoryModel>
  ) => void
  clearFilters: () => void
}

export const InputUseProductCategoryContext =
  createContext<InputUseProductCategoryContextData>(
    {} as InputUseProductCategoryContextData
  )

type InputUseProductCategoryProviderProps = {
  children: ReactNode
}

export function InputUseProductCategoryProvider({
  children,
}: InputUseProductCategoryProviderProps) {
  const [selectedInputUseProductCategory, setSelectedInputUseProductCategory] =
    useState<InputUseProductCategoryModel | null>(null)
  const [
    isOpenNewInputUseProductCategoryForm,
    setIsOpenNewInputUseProductCategoryForm,
  ] = useState(false)
  const [
    isOpenEditInputUseProductCategoryForm,
    setIsOpenEditInputUseProductCategoryForm,
  ] = useState(false)
  const [
    isOpenDeleteInputUseProductCategoryContainer,
    setIsOpenDeleteInputUseProductCategoryContainer,
  ] = useState(false)
  const [filters, setFilters] = useState<Filters<InputUseProductCategoryModel>>(
    {}
  )

  const openNewInputUseProductCategoryForm = useCallback(() => {
    setIsOpenNewInputUseProductCategoryForm(true)
  }, [])

  const closeNewInputUseProductCategoryForm = useCallback(() => {
    setIsOpenNewInputUseProductCategoryForm(false)
  }, [])

  const openEditInputUseProductCategoryForm = useCallback(
    (inputUseProductCategory: InputUseProductCategoryModel) => {
      setSelectedInputUseProductCategory(inputUseProductCategory)
      setIsOpenEditInputUseProductCategoryForm(true)
    },
    []
  )

  const closeEditInputUseProductCategoryForm = useCallback(() => {
    setSelectedInputUseProductCategory(null)
    setIsOpenEditInputUseProductCategoryForm(false)
  }, [])

  const openDeleteInputUseProductCategoryContainer = useCallback(
    (inputUseProductCategory: InputUseProductCategoryModel) => {
      setSelectedInputUseProductCategory(inputUseProductCategory)
      setIsOpenDeleteInputUseProductCategoryContainer(true)
    },
    []
  )

  const closeDeleteInputUseProductCategoryContainer = useCallback(() => {
    setSelectedInputUseProductCategory(null)
    setIsOpenDeleteInputUseProductCategoryContainer(false)
  }, [])

  const handleChangeFilters = useCallback(
    (newFilters: Filters<InputUseProductCategoryModel>) => {
      setFilters((prev) => ({ ...prev, ...newFilters }))
    },
    []
  )

  const clearFilters = useCallback(() => {
    setFilters({})
  }, [])

  const value = useMemo(
    () => ({
      selectedInputUseProductCategory,
      isOpenNewInputUseProductCategoryForm,
      isOpenEditInputUseProductCategoryForm,
      isOpenDeleteInputUseProductCategoryContainer,
      filters,
      openNewInputUseProductCategoryForm,
      closeNewInputUseProductCategoryForm,
      openEditInputUseProductCategoryForm,
      closeEditInputUseProductCategoryForm,
      openDeleteInputUseProductCategoryContainer,
      closeDeleteInputUseProductCategoryContainer,
      handleChangeFilters,
      clearFilters,
    }),
    [
      selectedInputUseProductCategory,
      isOpenNewInputUseProductCategoryForm,
      isOpenEditInputUseProductCategoryForm,
      isOpenDeleteInputUseProductCategoryContainer,
      filters,
      openNewInputUseProductCategoryForm,
      closeNewInputUseProductCategoryForm,
      openEditInputUseProductCategoryForm,
      closeEditInputUseProductCategoryForm,
      openDeleteInputUseProductCategoryContainer,
      closeDeleteInputUseProductCategoryContainer,
      handleChangeFilters,
      clearFilters,
    ]
  )

  return (
    <InputUseProductCategoryContext.Provider value={value}>
      {children}
    </InputUseProductCategoryContext.Provider>
  )
}
