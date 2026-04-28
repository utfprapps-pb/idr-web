import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

import { useParams } from 'react-router-dom'

import { type ForageAvailabilityModel } from '../../domain/models/forage-availability-model'
import { type ForageAvailabilityFilters } from '../types'

export type ForageAvailabilityContextData = {
  propertyId: number
  selectedForageAvailability?: ForageAvailabilityModel
  isOpenNewForageAvailabilityForm: boolean
  isOpenEditForageAvailabilityForm: boolean
  isOpenDeleteForageAvailabilityContainer: boolean
  filters: ForageAvailabilityFilters
  openNewForageAvailabilityForm: () => void
  closeNewForageAvailabilityForm: () => void
  openEditForageAvailabilityForm: (
    forageAvailability: ForageAvailabilityModel
  ) => void
  closeEditForageAvailabilityForm: () => void
  openDeleteForageAvailabilityContainer: (
    forageAvailability: ForageAvailabilityModel
  ) => void
  closeDeleteForageAvailabilityContainer: () => void
  handleChangeFilters: (newFilters: ForageAvailabilityFilters) => void
  clearFilters: () => void
}

export const ForageAvailabilityContext =
  createContext<ForageAvailabilityContextData>(
    {} as ForageAvailabilityContextData
  )

type ForageAvailabilityProviderProps = {
  children: ReactNode
}

export function ForageAvailabilityProvider({
  children,
}: ForageAvailabilityProviderProps) {
  const params = useParams<{ propertyId: string }>()

  const [selectedForageAvailability, setSelectedForageAvailability] =
    useState<ForageAvailabilityModel>()
  const [isOpenNewForageAvailabilityForm, setIsOpenNewForageAvailabilityForm] =
    useState(false)
  const [
    isOpenEditForageAvailabilityForm,
    setIsOpenEditForageAvailabilityForm,
  ] = useState(false)
  const [
    isOpenDeleteForageAvailabilityContainer,
    setIsOpenDeleteForageAvailabilityContainer,
  ] = useState(false)
  const [filters, setFilters] = useState<ForageAvailabilityFilters>({})

  const openNewForageAvailabilityForm = useCallback(() => {
    setIsOpenNewForageAvailabilityForm(true)
  }, [])

  const closeNewForageAvailabilityForm = useCallback(() => {
    setIsOpenNewForageAvailabilityForm(false)
  }, [])

  const openEditForageAvailabilityForm = useCallback(
    (forageAvailability: ForageAvailabilityModel) => {
      setSelectedForageAvailability(forageAvailability)
      setIsOpenEditForageAvailabilityForm(true)
    },
    []
  )

  const closeEditForageAvailabilityForm = useCallback(() => {
    setSelectedForageAvailability(undefined)
    setIsOpenEditForageAvailabilityForm(false)
  }, [])

  const openDeleteForageAvailabilityContainer = useCallback(
    (forageAvailability: ForageAvailabilityModel) => {
      setSelectedForageAvailability(forageAvailability)
      setIsOpenDeleteForageAvailabilityContainer(true)
    },
    []
  )

  const closeDeleteForageAvailabilityContainer = useCallback(() => {
    setSelectedForageAvailability(undefined)
    setIsOpenDeleteForageAvailabilityContainer(false)
  }, [])

  const handleChangeFilters = useCallback(
    (newFilters: ForageAvailabilityFilters) => {
      setFilters((prev) => ({ ...prev, ...newFilters }))
    },
    []
  )

  const clearFilters = useCallback(() => {
    setFilters({})
  }, [])

  const value = useMemo(
    () => ({
      propertyId: Number(params.propertyId),
      selectedForageAvailability,
      isOpenNewForageAvailabilityForm,
      isOpenEditForageAvailabilityForm,
      isOpenDeleteForageAvailabilityContainer,
      filters,
      openNewForageAvailabilityForm,
      closeNewForageAvailabilityForm,
      openEditForageAvailabilityForm,
      closeEditForageAvailabilityForm,
      openDeleteForageAvailabilityContainer,
      closeDeleteForageAvailabilityContainer,
      handleChangeFilters,
      clearFilters,
    }),
    [
      params.propertyId,
      selectedForageAvailability,
      isOpenNewForageAvailabilityForm,
      isOpenEditForageAvailabilityForm,
      isOpenDeleteForageAvailabilityContainer,
      filters,
      openNewForageAvailabilityForm,
      closeNewForageAvailabilityForm,
      openEditForageAvailabilityForm,
      closeEditForageAvailabilityForm,
      openDeleteForageAvailabilityContainer,
      closeDeleteForageAvailabilityContainer,
      handleChangeFilters,
      clearFilters,
    ]
  )

  if (!params.propertyId) {
    return null
  }

  return (
    <ForageAvailabilityContext.Provider value={value}>
      {children}
    </ForageAvailabilityContext.Provider>
  )
}
