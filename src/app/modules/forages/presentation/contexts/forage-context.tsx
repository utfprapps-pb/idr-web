import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'

import { useParams } from 'react-router-dom'

import type { ForageModel } from '../../domain/models/forages-model'
import type { ForageFilters } from '../types'

type ForageContextValue = {
  propertyId: string
  filters: ForageFilters
  handleChangeFilters: (newFilters: ForageFilters) => void
  selectedForage?: ForageModel
  isOpenNewForageForm: boolean
  isOpenEditForageForm: boolean
  isOpenDeleteForageContainer: boolean
  openNewForageForm: () => void
  closeNewForageForm: () => void
  openEditForageForm: (forage: ForageModel) => void
  closeEditForageForm: () => void
  openDeleteForageContainer: (forage: ForageModel) => void
  closeDeleteForageContainer: () => void
}

export const ForageContext = createContext({} as ForageContextValue)

export function ForageProvider({ children }: PropsWithChildren) {
  const params = useParams<{ propertyId: string }>()

  const [filters, setFilters] = useState<ForageFilters>({
    cultivation: '',
  })

  const handleChangeFilters = useCallback((newFilters: ForageFilters) => {
    setFilters((prevState) => ({
      ...prevState,
      ...newFilters,
    }))
  }, [])

  const [isOpenNewForageForm, setIsOpenNewForageForm] = useState(false)

  const [isOpenEditForageForm, setIsOpenEditForageForm] = useState(false)

  const [isOpenDeleteForageContainer, setIsOpenDeleteForageContainer] =
    useState(false)

  const [selectedForage, setSelectedForage] = useState<ForageModel>()

  const openNewForageForm = useCallback(() => {
    setIsOpenNewForageForm(true)
  }, [])

  const closeNewForageForm = useCallback(() => {
    setIsOpenNewForageForm(false)
  }, [])

  const openEditForageForm = useCallback((forage: ForageModel) => {
    setSelectedForage(forage)
    setIsOpenEditForageForm(true)
  }, [])

  const closeEditForageForm = useCallback(() => {
    setSelectedForage(undefined)
    setIsOpenEditForageForm(false)
  }, [])

  const openDeleteForageContainer = useCallback((forage: ForageModel) => {
    setSelectedForage(forage)
    setIsOpenDeleteForageContainer(true)
  }, [])

  const closeDeleteForageContainer = useCallback(() => {
    setSelectedForage(undefined)
    setIsOpenDeleteForageContainer(false)
  }, [])

  const providerValues = useMemo(
    () => ({
      propertyId: params.propertyId as string, // Typecast allowed to avoid undefined, as it has validation below
      filters,
      handleChangeFilters,
      selectedForage,
      isOpenNewForageForm,
      isOpenEditForageForm,
      isOpenDeleteForageContainer,
      openNewForageForm,
      closeNewForageForm,
      openEditForageForm,
      closeEditForageForm,
      openDeleteForageContainer,
      closeDeleteForageContainer,
    }),
    [
      params.propertyId,
      filters,
      handleChangeFilters,
      selectedForage,
      isOpenNewForageForm,
      isOpenEditForageForm,
      isOpenDeleteForageContainer,
      openNewForageForm,
      closeNewForageForm,
      openEditForageForm,
      closeEditForageForm,
      openDeleteForageContainer,
      closeDeleteForageContainer,
    ]
  )

  if (!params.propertyId) {
    return null
  }

  return (
    <ForageContext.Provider value={providerValues}>
      {children}
    </ForageContext.Provider>
  )
}

ForageProvider.displayName = 'ForageProvider'
