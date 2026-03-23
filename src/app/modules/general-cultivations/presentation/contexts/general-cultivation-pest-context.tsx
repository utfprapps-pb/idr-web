import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'

import type { GeneralCultivationPestModel } from '../../domain/models/general-cultivation-pests-model'
import type { GeneralCultivationPestFilters } from '../types/general-cultivation-pest-types'

type GeneralCultivationPestContextValue = {
  filters: GeneralCultivationPestFilters
  handleChangeFilters: (newFilters: GeneralCultivationPestFilters) => void
  selectedGeneralCultivationPest?: GeneralCultivationPestModel
  isOpenNewGeneralCultivationPestForm: boolean
  isOpenEditGeneralCultivationPestForm: boolean
  isOpenDeleteGeneralCultivationPestContainer: boolean
  openNewGeneralCultivationPestForm: () => void
  closeNewGeneralCultivationPestForm: () => void
  openEditGeneralCultivationPestForm: (
    generalCultivationPest: GeneralCultivationPestModel
  ) => void
  closeEditGeneralCultivationPestForm: () => void
  openDeleteGeneralCultivationPestContainer: (
    generalCultivationPest: GeneralCultivationPestModel
  ) => void
  closeDeleteGeneralCultivationPestContainer: () => void
}

export const GeneralCultivationPestContext = createContext(
  {} as GeneralCultivationPestContextValue
)

export function GeneralCultivationPestProvider({
  children,
}: Readonly<PropsWithChildren>) {
  const [filters, setFilters] = useState<GeneralCultivationPestFilters>({})

  const handleChangeFilters = useCallback(
    (newFilters: GeneralCultivationPestFilters) => {
      setFilters((prevState) => ({
        ...prevState,
        ...newFilters,
      }))
    },
    []
  )

  const [
    isOpenNewGeneralCultivationPestForm,
    setIsOpenNewGeneralCultivationPestForm,
  ] = useState(false)

  const [
    isOpenEditGeneralCultivationPestForm,
    setIsOpenEditGeneralCultivationPestForm,
  ] = useState(false)

  const [
    isOpenDeleteGeneralCultivationPestContainer,
    setIsOpenDeleteGeneralCultivationPestContainer,
  ] = useState(false)

  const [selectedGeneralCultivationPest, setSelectedGeneralCultivationPest] =
    useState<GeneralCultivationPestModel>()

  const openNewGeneralCultivationPestForm = useCallback(() => {
    setIsOpenNewGeneralCultivationPestForm(true)
  }, [])

  const closeNewGeneralCultivationPestForm = useCallback(() => {
    setIsOpenNewGeneralCultivationPestForm(false)
  }, [])

  const openEditGeneralCultivationPestForm = useCallback(
    (generalCultivationPest: GeneralCultivationPestModel) => {
      setSelectedGeneralCultivationPest(generalCultivationPest)
      setIsOpenEditGeneralCultivationPestForm(true)
    },
    []
  )

  const closeEditGeneralCultivationPestForm = useCallback(() => {
    setSelectedGeneralCultivationPest(undefined)
    setIsOpenEditGeneralCultivationPestForm(false)
  }, [])

  const openDeleteGeneralCultivationPestContainer = useCallback(
    (generalCultivationPest: GeneralCultivationPestModel) => {
      setSelectedGeneralCultivationPest(generalCultivationPest)
      setIsOpenDeleteGeneralCultivationPestContainer(true)
    },
    []
  )

  const closeDeleteGeneralCultivationPestContainer = useCallback(() => {
    setSelectedGeneralCultivationPest(undefined)
    setIsOpenDeleteGeneralCultivationPestContainer(false)
  }, [])

  const providerValues = useMemo(
    () => ({
      filters,
      handleChangeFilters,
      selectedGeneralCultivationPest,
      isOpenNewGeneralCultivationPestForm,
      isOpenEditGeneralCultivationPestForm,
      isOpenDeleteGeneralCultivationPestContainer,
      openNewGeneralCultivationPestForm,
      closeNewGeneralCultivationPestForm,
      openEditGeneralCultivationPestForm,
      closeEditGeneralCultivationPestForm,
      openDeleteGeneralCultivationPestContainer,
      closeDeleteGeneralCultivationPestContainer,
    }),
    [
      filters,
      handleChangeFilters,
      selectedGeneralCultivationPest,
      isOpenNewGeneralCultivationPestForm,
      isOpenEditGeneralCultivationPestForm,
      isOpenDeleteGeneralCultivationPestContainer,
      openNewGeneralCultivationPestForm,
      closeNewGeneralCultivationPestForm,
      openEditGeneralCultivationPestForm,
      closeEditGeneralCultivationPestForm,
      openDeleteGeneralCultivationPestContainer,
      closeDeleteGeneralCultivationPestContainer,
    ]
  )

  return (
    <GeneralCultivationPestContext.Provider value={providerValues}>
      {children}
    </GeneralCultivationPestContext.Provider>
  )
}

GeneralCultivationPestProvider.displayName = 'GeneralCultivationPestProvider'
