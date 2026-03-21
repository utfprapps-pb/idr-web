import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'

import type { GeneralCultivationDiseaseModel } from '../../domain/models/general-cultivation-diseases-model'
import type { GeneralCultivationDiseaseFilters } from '../types/general-cultivation-disease-types'

type GeneralCultivationDiseaseContextValue = {
  filters: GeneralCultivationDiseaseFilters
  handleChangeFilters: (newFilters: GeneralCultivationDiseaseFilters) => void
  selectedGeneralCultivationDisease?: GeneralCultivationDiseaseModel
  isOpenNewGeneralCultivationDiseaseForm: boolean
  isOpenEditGeneralCultivationDiseaseForm: boolean
  isOpenDeleteGeneralCultivationDiseaseContainer: boolean
  openNewGeneralCultivationDiseaseForm: () => void
  closeNewGeneralCultivationDiseaseForm: () => void
  openEditGeneralCultivationDiseaseForm: (
    generalCultivationDisease: GeneralCultivationDiseaseModel
  ) => void
  closeEditGeneralCultivationDiseaseForm: () => void
  openDeleteGeneralCultivationDiseaseContainer: (
    generalCultivationDisease: GeneralCultivationDiseaseModel
  ) => void
  closeDeleteGeneralCultivationDiseaseContainer: () => void
}

export const GeneralCultivationDiseaseContext = createContext(
  {} as GeneralCultivationDiseaseContextValue
)

export function GeneralCultivationDiseaseProvider({
  children,
}: Readonly<PropsWithChildren>) {
  const [filters, setFilters] = useState<GeneralCultivationDiseaseFilters>({})

  const handleChangeFilters = useCallback(
    (newFilters: GeneralCultivationDiseaseFilters) => {
      setFilters((prevState) => ({
        ...prevState,
        ...newFilters,
      }))
    },
    []
  )

  const [
    isOpenNewGeneralCultivationDiseaseForm,
    setIsOpenNewGeneralCultivationDiseaseForm,
  ] = useState(false)

  const [
    isOpenEditGeneralCultivationDiseaseForm,
    setIsOpenEditGeneralCultivationDiseaseForm,
  ] = useState(false)

  const [
    isOpenDeleteGeneralCultivationDiseaseContainer,
    setIsOpenDeleteGeneralCultivationDiseaseContainer,
  ] = useState(false)

  const [
    selectedGeneralCultivationDisease,
    setSelectedGeneralCultivationDisease,
  ] = useState<GeneralCultivationDiseaseModel>()

  const openNewGeneralCultivationDiseaseForm = useCallback(() => {
    setIsOpenNewGeneralCultivationDiseaseForm(true)
  }, [])

  const closeNewGeneralCultivationDiseaseForm = useCallback(() => {
    setIsOpenNewGeneralCultivationDiseaseForm(false)
  }, [])

  const openEditGeneralCultivationDiseaseForm = useCallback(
    (generalCultivationDisease: GeneralCultivationDiseaseModel) => {
      setSelectedGeneralCultivationDisease(generalCultivationDisease)
      setIsOpenEditGeneralCultivationDiseaseForm(true)
    },
    []
  )

  const closeEditGeneralCultivationDiseaseForm = useCallback(() => {
    setSelectedGeneralCultivationDisease(undefined)
    setIsOpenEditGeneralCultivationDiseaseForm(false)
  }, [])

  const openDeleteGeneralCultivationDiseaseContainer = useCallback(
    (generalCultivationDisease: GeneralCultivationDiseaseModel) => {
      setSelectedGeneralCultivationDisease(generalCultivationDisease)
      setIsOpenDeleteGeneralCultivationDiseaseContainer(true)
    },
    []
  )

  const closeDeleteGeneralCultivationDiseaseContainer = useCallback(() => {
    setSelectedGeneralCultivationDisease(undefined)
    setIsOpenDeleteGeneralCultivationDiseaseContainer(false)
  }, [])

  const providerValues = useMemo(
    () => ({
      filters,
      handleChangeFilters,
      selectedGeneralCultivationDisease,
      isOpenNewGeneralCultivationDiseaseForm,
      isOpenEditGeneralCultivationDiseaseForm,
      isOpenDeleteGeneralCultivationDiseaseContainer,
      openNewGeneralCultivationDiseaseForm,
      closeNewGeneralCultivationDiseaseForm,
      openEditGeneralCultivationDiseaseForm,
      closeEditGeneralCultivationDiseaseForm,
      openDeleteGeneralCultivationDiseaseContainer,
      closeDeleteGeneralCultivationDiseaseContainer,
    }),
    [
      filters,
      handleChangeFilters,
      selectedGeneralCultivationDisease,
      isOpenNewGeneralCultivationDiseaseForm,
      isOpenEditGeneralCultivationDiseaseForm,
      isOpenDeleteGeneralCultivationDiseaseContainer,
      openNewGeneralCultivationDiseaseForm,
      closeNewGeneralCultivationDiseaseForm,
      openEditGeneralCultivationDiseaseForm,
      closeEditGeneralCultivationDiseaseForm,
      openDeleteGeneralCultivationDiseaseContainer,
      closeDeleteGeneralCultivationDiseaseContainer,
    ]
  )

  return (
    <GeneralCultivationDiseaseContext.Provider value={providerValues}>
      {children}
    </GeneralCultivationDiseaseContext.Provider>
  )
}

GeneralCultivationDiseaseProvider.displayName =
  'GeneralCultivationDiseaseProvider'
