import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'

import { useParams } from 'react-router-dom'

import type { CultivationDiseaseModel } from '../../domain/models/cultivation-diseases-model'
import type { CultivationDiseaseFilters } from '../types/cultivation-disease-types'

type CultivationDiseaseValue = {
  propertyId: number
  selectedCultivationDisease?: CultivationDiseaseModel
  filters: CultivationDiseaseFilters
  handleChangeFilters: (newFilters: CultivationDiseaseFilters) => void
  isOpenNewCultivationDiseaseForm: boolean
  isOpenEditCultivationDiseaseForm: boolean
  isOpenDeleteCultivationDiseaseContainer: boolean
  openNewCultivationDiseaseForm: () => void
  closeNewCultivationDiseaseForm: () => void
  openEditCultivationDiseaseForm: (
    cultivationDisease: CultivationDiseaseModel
  ) => void
  closeEditCultivationDiseaseForm: () => void
  openDeleteCultivationDiseaseContainer: (
    cultivationDisease: CultivationDiseaseModel
  ) => void
  closeDeleteCultivationDiseaseContainer: () => void
}

export const CultivationDiseaseContext = createContext<CultivationDiseaseValue>(
  {} as CultivationDiseaseValue
)

export function CultivationDiseaseProvider({
  children,
}: Readonly<PropsWithChildren>) {
  const params = useParams<{ propertyId: string }>()

  const [filters, setFilters] = useState<CultivationDiseaseFilters>({})

  const handleChangeFilters = useCallback(
    (newFilters: CultivationDiseaseFilters) => {
      setFilters((prevState) => ({
        ...prevState,
        ...newFilters,
      }))
    },
    []
  )

  const [isOpenNewCultivationDiseaseForm, setIsOpenNewCultivationDiseaseForm] =
    useState(false)

  const [
    isOpenEditCultivationDiseaseForm,
    setIsOpenEditCultivationDiseaseForm,
  ] = useState(false)

  const [
    isOpenDeleteCultivationDiseaseContainer,
    setIsOpenDeleteCultivationDiseaseContainer,
  ] = useState(false)

  const [selectedCultivationDisease, setSelectedCultivationDisease] =
    useState<CultivationDiseaseModel>()

  const openNewCultivationDiseaseForm = useCallback(() => {
    setIsOpenNewCultivationDiseaseForm(true)
  }, [])

  const closeNewCultivationDiseaseForm = useCallback(() => {
    setIsOpenNewCultivationDiseaseForm(false)
  }, [])

  const openEditCultivationDiseaseForm = useCallback(
    (cultivationDisease: CultivationDiseaseModel) => {
      setSelectedCultivationDisease(cultivationDisease)
      setIsOpenEditCultivationDiseaseForm(true)
    },
    []
  )

  const closeEditCultivationDiseaseForm = useCallback(() => {
    setSelectedCultivationDisease(undefined)
    setIsOpenEditCultivationDiseaseForm(false)
  }, [])

  const openDeleteCultivationDiseaseContainer = useCallback(
    (cultivationDisease: CultivationDiseaseModel) => {
      setSelectedCultivationDisease(cultivationDisease)
      setIsOpenDeleteCultivationDiseaseContainer(true)
    },
    []
  )

  const closeDeleteCultivationDiseaseContainer = useCallback(() => {
    setSelectedCultivationDisease(undefined)
    setIsOpenDeleteCultivationDiseaseContainer(false)
  }, [])

  const providerValues = useMemo(
    () => ({
      propertyId: Number(params.propertyId),
      filters,
      handleChangeFilters,
      selectedCultivationDisease,
      isOpenNewCultivationDiseaseForm,
      isOpenEditCultivationDiseaseForm,
      isOpenDeleteCultivationDiseaseContainer,
      openNewCultivationDiseaseForm,
      closeNewCultivationDiseaseForm,
      openEditCultivationDiseaseForm,
      closeEditCultivationDiseaseForm,
      openDeleteCultivationDiseaseContainer,
      closeDeleteCultivationDiseaseContainer,
    }),
    [
      params.propertyId,
      filters,
      handleChangeFilters,
      selectedCultivationDisease,
      isOpenNewCultivationDiseaseForm,
      isOpenEditCultivationDiseaseForm,
      isOpenDeleteCultivationDiseaseContainer,
      openNewCultivationDiseaseForm,
      closeNewCultivationDiseaseForm,
      openEditCultivationDiseaseForm,
      closeEditCultivationDiseaseForm,
      openDeleteCultivationDiseaseContainer,
      closeDeleteCultivationDiseaseContainer,
    ]
  )

  return (
    <CultivationDiseaseContext.Provider value={providerValues}>
      {children}
    </CultivationDiseaseContext.Provider>
  )
}
