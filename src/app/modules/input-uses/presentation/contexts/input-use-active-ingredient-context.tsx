import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import type { InputUseActiveIngredientModel } from '../../domain/models/input-use-active-ingredients-model'
import type { Filters } from '@/core/domain/types'

export type InputUseActiveIngredientContextData = {
  selectedInputUseActiveIngredient: InputUseActiveIngredientModel | null
  isOpenNewInputUseActiveIngredientForm: boolean
  isOpenEditInputUseActiveIngredientForm: boolean
  isOpenDeleteInputUseActiveIngredientContainer: boolean
  filters: Filters<InputUseActiveIngredientModel>
  openNewInputUseActiveIngredientForm: () => void
  closeNewInputUseActiveIngredientForm: () => void
  openEditInputUseActiveIngredientForm: (
    inputUseActiveIngredient: InputUseActiveIngredientModel
  ) => void
  closeEditInputUseActiveIngredientForm: () => void
  openDeleteInputUseActiveIngredientContainer: (
    inputUseActiveIngredient: InputUseActiveIngredientModel
  ) => void
  closeDeleteInputUseActiveIngredientContainer: () => void
  handleChangeFilters: (
    newFilters: Filters<InputUseActiveIngredientModel>
  ) => void
  clearFilters: () => void
}

export const InputUseActiveIngredientContext =
  createContext<InputUseActiveIngredientContextData>(
    {} as InputUseActiveIngredientContextData
  )

type InputUseActiveIngredientProviderProps = {
  children: ReactNode
}

export function InputUseActiveIngredientProvider({
  children,
}: InputUseActiveIngredientProviderProps) {
  const [
    selectedInputUseActiveIngredient,
    setSelectedInputUseActiveIngredient,
  ] = useState<InputUseActiveIngredientModel | null>(null)
  const [
    isOpenNewInputUseActiveIngredientForm,
    setIsOpenNewInputUseActiveIngredientForm,
  ] = useState(false)
  const [
    isOpenEditInputUseActiveIngredientForm,
    setIsOpenEditInputUseActiveIngredientForm,
  ] = useState(false)
  const [
    isOpenDeleteInputUseActiveIngredientContainer,
    setIsOpenDeleteInputUseActiveIngredientContainer,
  ] = useState(false)
  const [filters, setFilters] = useState<
    Filters<InputUseActiveIngredientModel>
  >({})

  const openNewInputUseActiveIngredientForm = useCallback(() => {
    setIsOpenNewInputUseActiveIngredientForm(true)
  }, [])

  const closeNewInputUseActiveIngredientForm = useCallback(() => {
    setIsOpenNewInputUseActiveIngredientForm(false)
  }, [])

  const openEditInputUseActiveIngredientForm = useCallback(
    (inputUseActiveIngredient: InputUseActiveIngredientModel) => {
      setSelectedInputUseActiveIngredient(inputUseActiveIngredient)
      setIsOpenEditInputUseActiveIngredientForm(true)
    },
    []
  )

  const closeEditInputUseActiveIngredientForm = useCallback(() => {
    setSelectedInputUseActiveIngredient(null)
    setIsOpenEditInputUseActiveIngredientForm(false)
  }, [])

  const openDeleteInputUseActiveIngredientContainer = useCallback(
    (inputUseActiveIngredient: InputUseActiveIngredientModel) => {
      setSelectedInputUseActiveIngredient(inputUseActiveIngredient)
      setIsOpenDeleteInputUseActiveIngredientContainer(true)
    },
    []
  )

  const closeDeleteInputUseActiveIngredientContainer = useCallback(() => {
    setSelectedInputUseActiveIngredient(null)
    setIsOpenDeleteInputUseActiveIngredientContainer(false)
  }, [])

  const handleChangeFilters = useCallback(
    (newFilters: Filters<InputUseActiveIngredientModel>) => {
      setFilters((prev) => ({ ...prev, ...newFilters }))
    },
    []
  )

  const clearFilters = useCallback(() => {
    setFilters({})
  }, [])

  const value = useMemo(
    () => ({
      selectedInputUseActiveIngredient,
      isOpenNewInputUseActiveIngredientForm,
      isOpenEditInputUseActiveIngredientForm,
      isOpenDeleteInputUseActiveIngredientContainer,
      filters,
      openNewInputUseActiveIngredientForm,
      closeNewInputUseActiveIngredientForm,
      openEditInputUseActiveIngredientForm,
      closeEditInputUseActiveIngredientForm,
      openDeleteInputUseActiveIngredientContainer,
      closeDeleteInputUseActiveIngredientContainer,
      handleChangeFilters,
      clearFilters,
    }),
    [
      selectedInputUseActiveIngredient,
      isOpenNewInputUseActiveIngredientForm,
      isOpenEditInputUseActiveIngredientForm,
      isOpenDeleteInputUseActiveIngredientContainer,
      filters,
      openNewInputUseActiveIngredientForm,
      closeNewInputUseActiveIngredientForm,
      openEditInputUseActiveIngredientForm,
      closeEditInputUseActiveIngredientForm,
      openDeleteInputUseActiveIngredientContainer,
      closeDeleteInputUseActiveIngredientContainer,
      handleChangeFilters,
      clearFilters,
    ]
  )

  return (
    <InputUseActiveIngredientContext.Provider value={value}>
      {children}
    </InputUseActiveIngredientContext.Provider>
  )
}
