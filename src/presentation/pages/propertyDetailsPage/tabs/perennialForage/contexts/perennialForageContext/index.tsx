import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'

import type { PerennialForageFilters } from '../../types'
import type { PerennialForageModel } from '@/domain/models/perennialForageModel'

type PerennialForageContextValue = {
  filters: PerennialForageFilters
  handleChangeFilters: (newFilters: PerennialForageFilters) => void
  perennialForageSelected?: PerennialForageModel
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
  const [filters, setFilters] = useState<PerennialForageFilters>({
    description: '',
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

  const [perennialForageSelected, setPerennialForageSelected] =
    useState<PerennialForageModel>()

  const openNewPerennialForageForm = useCallback(() => {
    setIsOpenNewPerennialForageForm(true)
  }, [])

  const closeNewPerennialForageForm = useCallback(() => {
    setIsOpenNewPerennialForageForm(false)
  }, [])

  const openEditPerennialForageForm = useCallback(
    (perennialForage: PerennialForageModel) => {
      setPerennialForageSelected(perennialForage)
      setIsOpenEditPerennialForageForm(true)
    },
    []
  )

  const closeEditPerennialForageForm = useCallback(() => {
    setPerennialForageSelected(undefined)
    setIsOpenEditPerennialForageForm(false)
  }, [])

  const openDeletePerennialForageContainer = useCallback(
    (perennialForage: PerennialForageModel) => {
      setPerennialForageSelected(perennialForage)
      setIsOpenDeletePerennialForageContainer(true)
    },
    []
  )

  const closeDeletePerennialForageContainer = useCallback(() => {
    setPerennialForageSelected(undefined)
    setIsOpenDeletePerennialForageContainer(false)
  }, [])

  const providerValues = useMemo(
    () => ({
      filters,
      handleChangeFilters,
      perennialForageSelected,
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
      filters,
      handleChangeFilters,
      perennialForageSelected,
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

  return (
    <PerennialForageContext.Provider value={providerValues}>
      {children}
    </PerennialForageContext.Provider>
  )
}
