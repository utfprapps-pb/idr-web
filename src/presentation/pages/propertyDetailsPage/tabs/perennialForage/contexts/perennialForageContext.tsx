import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'

import { useParams } from 'react-router-dom'

import type { PerennialForageFilters } from '../types'
import type { PerennialForageModel } from '@/domain/models/perennialForageModel'

type PerennialForageContextValue = {
  propertyId: string
  filters: PerennialForageFilters
  handleChangeFilters: (newFilters: PerennialForageFilters) => void
  selectedPerennialForage?: PerennialForageModel
  isOpenNewPerennialForageForm: boolean
  isOpenEditPerennialForageForm: boolean
  isOpenDeletePerennialForageContainer: boolean
  openNewPerennialForageForm: () => void
  closeNewPerennialForageForm: () => void
  openEditPerennialForageForm: (perennialForage: PerennialForageModel) => void
  closeEditPerennialForageForm: () => void
  openDeletePerennialForageContainer: (
    perennialForage: PerennialForageModel
  ) => void
  closeDeletePerennialForageContainer: () => void
}

export const PerennialForageContext = createContext(
  {} as PerennialForageContextValue
)

export const PerennialForageProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const params = useParams<{ id: string }>()

  const [filters, setFilters] = useState<PerennialForageFilters>({
    cultivation: '',
  })

  const handleChangeFilters = useCallback(
    (newFilters: PerennialForageFilters) => {
      setFilters((prevState) => ({
        ...prevState,
        ...newFilters,
      }))
    },
    []
  )

  const [isOpenNewPerennialForageForm, setIsOpenNewPerennialForageForm] =
    useState(false)

  const [isOpenEditPerennialForageForm, setIsOpenEditPerennialForageForm] =
    useState(false)

  const [
    isOpenDeletePerennialForageContainer,
    setIsOpenDeletePerennialForageContainer,
  ] = useState(false)

  const [selectedPerennialForage, setSelectedPerennialForage] =
    useState<PerennialForageModel>()

  const openNewPerennialForageForm = useCallback(() => {
    setIsOpenNewPerennialForageForm(true)
  }, [])

  const closeNewPerennialForageForm = useCallback(() => {
    setIsOpenNewPerennialForageForm(false)
  }, [])

  const openEditPerennialForageForm = useCallback(
    (perennialForage: PerennialForageModel) => {
      setSelectedPerennialForage(perennialForage)
      setIsOpenEditPerennialForageForm(true)
    },
    []
  )

  const closeEditPerennialForageForm = useCallback(() => {
    setSelectedPerennialForage(undefined)
    setIsOpenEditPerennialForageForm(false)
  }, [])

  const openDeletePerennialForageContainer = useCallback(
    (perennialForage: PerennialForageModel) => {
      setSelectedPerennialForage(perennialForage)
      setIsOpenDeletePerennialForageContainer(true)
    },
    []
  )

  const closeDeletePerennialForageContainer = useCallback(() => {
    setSelectedPerennialForage(undefined)
    setIsOpenDeletePerennialForageContainer(false)
  }, [])

  const providerValues = useMemo(
    () => ({
      propertyId: params.id as string, // Typecast allowed to avoid undefined, as it has validation below
      filters,
      handleChangeFilters,
      selectedPerennialForage,
      isOpenNewPerennialForageForm,
      isOpenEditPerennialForageForm,
      isOpenDeletePerennialForageContainer,
      openNewPerennialForageForm,
      closeNewPerennialForageForm,
      openEditPerennialForageForm,
      closeEditPerennialForageForm,
      openDeletePerennialForageContainer,
      closeDeletePerennialForageContainer,
    }),
    [
      params.id,
      filters,
      handleChangeFilters,
      selectedPerennialForage,
      isOpenNewPerennialForageForm,
      isOpenEditPerennialForageForm,
      isOpenDeletePerennialForageContainer,
      openNewPerennialForageForm,
      closeNewPerennialForageForm,
      openEditPerennialForageForm,
      closeEditPerennialForageForm,
      openDeletePerennialForageContainer,
      closeDeletePerennialForageContainer,
    ]
  )

  if (!params.id) {
    return null
  }

  return (
    <PerennialForageContext.Provider value={providerValues}>
      {children}
    </PerennialForageContext.Provider>
  )
}
