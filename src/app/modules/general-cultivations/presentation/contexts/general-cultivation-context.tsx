import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'

import type { GeneralCultivationModel } from '../../domain/models/general-cultivations-model'
import type { GeneralCultivationFilters } from '../types/general-cultivation-types'

type GeneralCultivationContextValue = {
  filters: GeneralCultivationFilters
  handleChangeFilters: (newFilters: GeneralCultivationFilters) => void
  selectedGeneralCultivation?: GeneralCultivationModel
  isOpenNewGeneralCultivationForm: boolean
  isOpenEditGeneralCultivationForm: boolean
  isOpenDeleteGeneralCultivationContainer: boolean
  openNewGeneralCultivationForm: () => void
  closeNewGeneralCultivationForm: () => void
  openEditGeneralCultivationForm: (
    generalCultivation: GeneralCultivationModel
  ) => void
  closeEditGeneralCultivationForm: () => void
  openDeleteGeneralCultivationContainer: (
    generalCultivation: GeneralCultivationModel
  ) => void
  closeDeleteGeneralCultivationContainer: () => void
}

export const GeneralCultivationContext = createContext(
  {} as GeneralCultivationContextValue
)

export function GeneralCultivationProvider({
  children,
}: Readonly<PropsWithChildren>) {
  const [filters, setFilters] = useState<GeneralCultivationFilters>({})

  const handleChangeFilters = useCallback(
    (newFilters: GeneralCultivationFilters) => {
      setFilters((prevState) => ({
        ...prevState,
        ...newFilters,
      }))
    },
    []
  )

  const [isOpenNewGeneralCultivationForm, setIsOpenNewGeneralCultivationForm] =
    useState(false)

  const [
    isOpenEditGeneralCultivationForm,
    setIsOpenEditGeneralCultivationForm,
  ] = useState(false)

  const [
    isOpenDeleteGeneralCultivationContainer,
    setIsOpenDeleteGeneralCultivationContainer,
  ] = useState(false)

  const [selectedGeneralCultivation, setSelectedGeneralCultivation] =
    useState<GeneralCultivationModel>()

  const openNewGeneralCultivationForm = useCallback(() => {
    setIsOpenNewGeneralCultivationForm(true)
  }, [])

  const closeNewGeneralCultivationForm = useCallback(() => {
    setIsOpenNewGeneralCultivationForm(false)
  }, [])

  const openEditGeneralCultivationForm = useCallback(
    (generalCultivation: GeneralCultivationModel) => {
      setSelectedGeneralCultivation(generalCultivation)
      setIsOpenEditGeneralCultivationForm(true)
    },
    []
  )

  const closeEditGeneralCultivationForm = useCallback(() => {
    setSelectedGeneralCultivation(undefined)
    setIsOpenEditGeneralCultivationForm(false)
  }, [])

  const openDeleteGeneralCultivationContainer = useCallback(
    (generalCultivation: GeneralCultivationModel) => {
      setSelectedGeneralCultivation(generalCultivation)
      setIsOpenDeleteGeneralCultivationContainer(true)
    },
    []
  )

  const closeDeleteGeneralCultivationContainer = useCallback(() => {
    setSelectedGeneralCultivation(undefined)
    setIsOpenDeleteGeneralCultivationContainer(false)
  }, [])

  const providerValues = useMemo(
    () => ({
      filters,
      handleChangeFilters,
      selectedGeneralCultivation,
      isOpenNewGeneralCultivationForm,
      isOpenEditGeneralCultivationForm,
      isOpenDeleteGeneralCultivationContainer,
      openNewGeneralCultivationForm,
      closeNewGeneralCultivationForm,
      openEditGeneralCultivationForm,
      closeEditGeneralCultivationForm,
      openDeleteGeneralCultivationContainer,
      closeDeleteGeneralCultivationContainer,
    }),
    [
      filters,
      handleChangeFilters,
      selectedGeneralCultivation,
      isOpenNewGeneralCultivationForm,
      isOpenEditGeneralCultivationForm,
      isOpenDeleteGeneralCultivationContainer,
      openNewGeneralCultivationForm,
      closeNewGeneralCultivationForm,
      openEditGeneralCultivationForm,
      closeEditGeneralCultivationForm,
      openDeleteGeneralCultivationContainer,
      closeDeleteGeneralCultivationContainer,
    ]
  )

  return (
    <GeneralCultivationContext.Provider value={providerValues}>
      {children}
    </GeneralCultivationContext.Provider>
  )
}

GeneralCultivationProvider.displayName = 'GeneralCultivationProvider'
