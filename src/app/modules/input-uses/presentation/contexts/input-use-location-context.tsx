import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import type { InputUseLocationModel } from '../../domain/models/input-use-locations-model'
import type { Filters } from '@/core/domain/types'

export type InputUseLocationContextData = {
  selectedInputUseLocation: InputUseLocationModel | null
  isOpenNewInputUseLocationForm: boolean
  isOpenEditInputUseLocationForm: boolean
  isOpenDeleteInputUseLocationContainer: boolean
  filters: Filters<InputUseLocationModel>
  openNewInputUseLocationForm: () => void
  closeNewInputUseLocationForm: () => void
  openEditInputUseLocationForm: (
    inputUseLocation: InputUseLocationModel
  ) => void
  closeEditInputUseLocationForm: () => void
  openDeleteInputUseLocationContainer: (
    inputUseLocation: InputUseLocationModel
  ) => void
  closeDeleteInputUseLocationContainer: () => void
  handleChangeFilters: (newFilters: Filters<InputUseLocationModel>) => void
  clearFilters: () => void
}

export const InputUseLocationContext =
  createContext<InputUseLocationContextData>({} as InputUseLocationContextData)

type InputUseLocationProviderProps = {
  children: ReactNode
}

export function InputUseLocationProvider({
  children,
}: InputUseLocationProviderProps) {
  const [selectedInputUseLocation, setSelectedInputUseLocation] =
    useState<InputUseLocationModel | null>(null)
  const [isOpenNewInputUseLocationForm, setIsOpenNewInputUseLocationForm] =
    useState(false)
  const [isOpenEditInputUseLocationForm, setIsOpenEditInputUseLocationForm] =
    useState(false)
  const [
    isOpenDeleteInputUseLocationContainer,
    setIsOpenDeleteInputUseLocationContainer,
  ] = useState(false)
  const [filters, setFilters] = useState<Filters<InputUseLocationModel>>({})

  const openNewInputUseLocationForm = useCallback(() => {
    setIsOpenNewInputUseLocationForm(true)
  }, [])

  const closeNewInputUseLocationForm = useCallback(() => {
    setIsOpenNewInputUseLocationForm(false)
  }, [])

  const openEditInputUseLocationForm = useCallback(
    (inputUseLocation: InputUseLocationModel) => {
      setSelectedInputUseLocation(inputUseLocation)
      setIsOpenEditInputUseLocationForm(true)
    },
    []
  )

  const closeEditInputUseLocationForm = useCallback(() => {
    setSelectedInputUseLocation(null)
    setIsOpenEditInputUseLocationForm(false)
  }, [])

  const openDeleteInputUseLocationContainer = useCallback(
    (inputUseLocation: InputUseLocationModel) => {
      setSelectedInputUseLocation(inputUseLocation)
      setIsOpenDeleteInputUseLocationContainer(true)
    },
    []
  )

  const closeDeleteInputUseLocationContainer = useCallback(() => {
    setSelectedInputUseLocation(null)
    setIsOpenDeleteInputUseLocationContainer(false)
  }, [])

  const handleChangeFilters = useCallback(
    (newFilters: Filters<InputUseLocationModel>) => {
      setFilters((prev) => ({ ...prev, ...newFilters }))
    },
    []
  )

  const clearFilters = useCallback(() => {
    setFilters({})
  }, [])

  const value = useMemo(
    () => ({
      selectedInputUseLocation,
      isOpenNewInputUseLocationForm,
      isOpenEditInputUseLocationForm,
      isOpenDeleteInputUseLocationContainer,
      filters,
      openNewInputUseLocationForm,
      closeNewInputUseLocationForm,
      openEditInputUseLocationForm,
      closeEditInputUseLocationForm,
      openDeleteInputUseLocationContainer,
      closeDeleteInputUseLocationContainer,
      handleChangeFilters,
      clearFilters,
    }),
    [
      selectedInputUseLocation,
      isOpenNewInputUseLocationForm,
      isOpenEditInputUseLocationForm,
      isOpenDeleteInputUseLocationContainer,
      filters,
      openNewInputUseLocationForm,
      closeNewInputUseLocationForm,
      openEditInputUseLocationForm,
      closeEditInputUseLocationForm,
      openDeleteInputUseLocationContainer,
      closeDeleteInputUseLocationContainer,
      handleChangeFilters,
      clearFilters,
    ]
  )

  return (
    <InputUseLocationContext.Provider value={value}>
      {children}
    </InputUseLocationContext.Provider>
  )
}
