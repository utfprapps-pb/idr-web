import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'

import type { InputUseProductModel } from '../../domain/models/input-use-products-model'
import type { InputUseProductFilters } from '../types/input-use-product-types'

type InputUseProductContextValue = {
  filters: InputUseProductFilters
  handleChangeFilters: (newFilters: InputUseProductFilters) => void
  selectedInputUseProduct?: InputUseProductModel
  isOpenNewInputUseProductForm: boolean
  isOpenEditInputUseProductForm: boolean
  isOpenDeleteInputUseProductContainer: boolean
  openNewInputUseProductForm: () => void
  closeNewInputUseProductForm: () => void
  openEditInputUseProductForm: (inputUseProduct: InputUseProductModel) => void
  closeEditInputUseProductForm: () => void
  openDeleteInputUseProductContainer: (
    inputUseProduct: InputUseProductModel
  ) => void
  closeDeleteInputUseProductContainer: () => void
}

export const InputUseProductContext =
  createContext<InputUseProductContextValue>({} as InputUseProductContextValue)

export function InputUseProductProvider({
  children,
}: Readonly<PropsWithChildren>) {
  const [filters, setFilters] = useState<InputUseProductFilters>({})

  const handleChangeFilters = useCallback(
    (newFilters: InputUseProductFilters) => {
      setFilters((prevState: InputUseProductFilters) => ({
        ...prevState,
        ...newFilters,
      }))
    },
    []
  )

  const [isOpenNewInputUseProductForm, setIsOpenNewInputUseProductForm] =
    useState(false)

  const [isOpenEditInputUseProductForm, setIsOpenEditInputUseProductForm] =
    useState(false)

  const [
    isOpenDeleteInputUseProductContainer,
    setIsOpenDeleteInputUseProductContainer,
  ] = useState(false)

  const [selectedInputUseProduct, setSelectedInputUseProduct] =
    useState<InputUseProductModel>()

  const openNewInputUseProductForm = useCallback(() => {
    setIsOpenNewInputUseProductForm(true)
  }, [])

  const closeNewInputUseProductForm = useCallback(() => {
    setIsOpenNewInputUseProductForm(false)
  }, [])

  const openEditInputUseProductForm = useCallback(
    (inputUseProduct: InputUseProductModel) => {
      setSelectedInputUseProduct(inputUseProduct)
      setIsOpenEditInputUseProductForm(true)
    },
    []
  )

  const closeEditInputUseProductForm = useCallback(() => {
    setSelectedInputUseProduct(undefined)
    setIsOpenEditInputUseProductForm(false)
  }, [])

  const openDeleteInputUseProductContainer = useCallback(
    (inputUseProduct: InputUseProductModel) => {
      setSelectedInputUseProduct(inputUseProduct)
      setIsOpenDeleteInputUseProductContainer(true)
    },
    []
  )

  const closeDeleteInputUseProductContainer = useCallback(() => {
    setSelectedInputUseProduct(undefined)
    setIsOpenDeleteInputUseProductContainer(false)
  }, [])

  const providerValues = useMemo(
    () => ({
      filters,
      handleChangeFilters,
      selectedInputUseProduct,
      isOpenNewInputUseProductForm,
      isOpenEditInputUseProductForm,
      isOpenDeleteInputUseProductContainer,
      openNewInputUseProductForm,
      closeNewInputUseProductForm,
      openEditInputUseProductForm,
      closeEditInputUseProductForm,
      openDeleteInputUseProductContainer,
      closeDeleteInputUseProductContainer,
    }),
    [
      filters,
      handleChangeFilters,
      selectedInputUseProduct,
      isOpenNewInputUseProductForm,
      isOpenEditInputUseProductForm,
      isOpenDeleteInputUseProductContainer,
      openNewInputUseProductForm,
      closeNewInputUseProductForm,
      openEditInputUseProductForm,
      closeEditInputUseProductForm,
      openDeleteInputUseProductContainer,
      closeDeleteInputUseProductContainer,
    ]
  )

  return (
    <InputUseProductContext.Provider value={providerValues}>
      {children}
    </InputUseProductContext.Provider>
  )
}

InputUseProductProvider.displayName = 'InputUseProductProvider'
