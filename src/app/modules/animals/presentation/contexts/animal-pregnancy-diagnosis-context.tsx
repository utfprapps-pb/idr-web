import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'

import { useParams } from 'react-router-dom'

import type { AnimalPregnancyDiagnosisModel } from '../../domain/models/animal-pregnancy-diagnoses-model'
import type { AnimalPregnancyDiagnosisFilters } from '../types/animal-pregnancy-diagnosis-types'

type AnimalPregnancyDiagnosisValue = {
  propertyId: number
  animalId: number
  selectedAnimalPregnancyDiagnosis?: AnimalPregnancyDiagnosisModel
  filters: AnimalPregnancyDiagnosisFilters
  handleChangeFilters: (newFilters: AnimalPregnancyDiagnosisFilters) => void
  isOpenNewAnimalPregnancyDiagnosisForm: boolean
  isOpenEditAnimalPregnancyDiagnosisForm: boolean
  isOpenDeleteAnimalPregnancyDiagnosisContainer: boolean
  openNewAnimalPregnancyDiagnosisForm: () => void
  closeNewAnimalPregnancyDiagnosisForm: () => void
  openEditAnimalPregnancyDiagnosisForm: (
    animalPregnancyDiagnosis: AnimalPregnancyDiagnosisModel
  ) => void
  closeEditAnimalPregnancyDiagnosisForm: () => void
  openDeleteAnimalPregnancyDiagnosisContainer: (
    animalPregnancyDiagnosis: AnimalPregnancyDiagnosisModel
  ) => void
  closeDeleteAnimalPregnancyDiagnosisContainer: () => void
}

export const AnimalPregnancyDiagnosisContext =
  createContext<AnimalPregnancyDiagnosisValue>(
    {} as AnimalPregnancyDiagnosisValue
  )

type AnimalPregnancyDiagnosisProviderProps = PropsWithChildren<{
  animalId: number
}>

export function AnimalPregnancyDiagnosisProvider({
  children,
  animalId,
}: AnimalPregnancyDiagnosisProviderProps) {
  const params = useParams<{ propertyId: string }>()

  const [filters, setFilters] = useState<AnimalPregnancyDiagnosisFilters>({})

  const handleChangeFilters = useCallback(
    (newFilters: AnimalPregnancyDiagnosisFilters) => {
      setFilters((prevState) => ({
        ...prevState,
        ...newFilters,
      }))
    },
    []
  )

  const [
    isOpenNewAnimalPregnancyDiagnosisForm,
    setIsOpenNewAnimalPregnancyDiagnosisForm,
  ] = useState(false)

  const [
    isOpenEditAnimalPregnancyDiagnosisForm,
    setIsOpenEditAnimalPregnancyDiagnosisForm,
  ] = useState(false)

  const [
    isOpenDeleteAnimalPregnancyDiagnosisContainer,
    setIsOpenDeleteAnimalPregnancyDiagnosisContainer,
  ] = useState(false)

  const [
    selectedAnimalPregnancyDiagnosis,
    setSelectedAnimalPregnancyDiagnosis,
  ] = useState<AnimalPregnancyDiagnosisModel>()

  const openNewAnimalPregnancyDiagnosisForm = useCallback(() => {
    setIsOpenNewAnimalPregnancyDiagnosisForm(true)
  }, [])

  const closeNewAnimalPregnancyDiagnosisForm = useCallback(() => {
    setIsOpenNewAnimalPregnancyDiagnosisForm(false)
  }, [])

  const openEditAnimalPregnancyDiagnosisForm = useCallback(
    (animalPregnancyDiagnosis: AnimalPregnancyDiagnosisModel) => {
      setSelectedAnimalPregnancyDiagnosis(animalPregnancyDiagnosis)
      setIsOpenEditAnimalPregnancyDiagnosisForm(true)
    },
    []
  )

  const closeEditAnimalPregnancyDiagnosisForm = useCallback(() => {
    setSelectedAnimalPregnancyDiagnosis(undefined)
    setIsOpenEditAnimalPregnancyDiagnosisForm(false)
  }, [])

  const openDeleteAnimalPregnancyDiagnosisContainer = useCallback(
    (animalPregnancyDiagnosis: AnimalPregnancyDiagnosisModel) => {
      setSelectedAnimalPregnancyDiagnosis(animalPregnancyDiagnosis)
      setIsOpenDeleteAnimalPregnancyDiagnosisContainer(true)
    },
    []
  )

  const closeDeleteAnimalPregnancyDiagnosisContainer = useCallback(() => {
    setSelectedAnimalPregnancyDiagnosis(undefined)
    setIsOpenDeleteAnimalPregnancyDiagnosisContainer(false)
  }, [])

  const providerValues = useMemo(
    () => ({
      propertyId: Number(params.propertyId),
      animalId,
      filters,
      handleChangeFilters,
      selectedAnimalPregnancyDiagnosis,
      isOpenNewAnimalPregnancyDiagnosisForm,
      isOpenEditAnimalPregnancyDiagnosisForm,
      isOpenDeleteAnimalPregnancyDiagnosisContainer,
      openNewAnimalPregnancyDiagnosisForm,
      closeNewAnimalPregnancyDiagnosisForm,
      openEditAnimalPregnancyDiagnosisForm,
      closeEditAnimalPregnancyDiagnosisForm,
      openDeleteAnimalPregnancyDiagnosisContainer,
      closeDeleteAnimalPregnancyDiagnosisContainer,
    }),
    [
      params.propertyId,
      animalId,
      filters,
      handleChangeFilters,
      selectedAnimalPregnancyDiagnosis,
      isOpenNewAnimalPregnancyDiagnosisForm,
      isOpenEditAnimalPregnancyDiagnosisForm,
      isOpenDeleteAnimalPregnancyDiagnosisContainer,
      openNewAnimalPregnancyDiagnosisForm,
      closeNewAnimalPregnancyDiagnosisForm,
      openEditAnimalPregnancyDiagnosisForm,
      closeEditAnimalPregnancyDiagnosisForm,
      openDeleteAnimalPregnancyDiagnosisContainer,
      closeDeleteAnimalPregnancyDiagnosisContainer,
    ]
  )

  return (
    <AnimalPregnancyDiagnosisContext.Provider value={providerValues}>
      {children}
    </AnimalPregnancyDiagnosisContext.Provider>
  )
}
