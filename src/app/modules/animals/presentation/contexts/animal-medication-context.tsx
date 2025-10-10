import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'

import { useParams } from 'react-router-dom'

import type { AnimalMedicationModel } from '../../domain/models/animal-medications-model'
import type { AnimalMedicationFilters } from '../types/animal-medication-types'

type AnimalMedicationContextValue = {
  propertyId: number
  animalId: number
  selectedAnimalMedication?: AnimalMedicationModel
  filters: AnimalMedicationFilters
  handleChangeFilters: (newFilters: AnimalMedicationFilters) => void
  isOpenNewAnimalMedicationForm: boolean
  isOpenEditAnimalMedicationForm: boolean
  isOpenDeleteAnimalMedicationContainer: boolean
  openNewAnimalMedicationForm: () => void
  closeNewAnimalMedicationForm: () => void
  openEditAnimalMedicationForm: (
    animalMedication: AnimalMedicationModel
  ) => void
  closeEditAnimalMedicationForm: () => void
  openDeleteAnimalMedicationContainer: (
    animalMedication: AnimalMedicationModel
  ) => void
  closeDeleteAnimalMedicationContainer: () => void
}

export const AnimalMedicationContext =
  createContext<AnimalMedicationContextValue>(
    {} as AnimalMedicationContextValue
  )

type AnimalMedicationProviderProps = PropsWithChildren<{
  animalId: number
}>

export function AnimalMedicationProvider({
  children,
  animalId,
}: AnimalMedicationProviderProps) {
  const params = useParams<{ propertyId: string }>()

  const [filters, setFilters] = useState<AnimalMedicationFilters>({})

  const handleChangeFilters = useCallback(
    (newFilters: AnimalMedicationFilters) => {
      setFilters((prevState) => ({
        ...prevState,
        ...newFilters,
      }))
    },
    []
  )

  const [isOpenNewAnimalMedicationForm, setIsOpenNewAnimalMedicationForm] =
    useState(false)

  const [isOpenEditAnimalMedicationForm, setIsOpenEditAnimalMedicationForm] =
    useState(false)

  const [
    isOpenDeleteAnimalMedicationContainer,
    setIsOpenDeleteAnimalMedicationContainer,
  ] = useState(false)

  const [selectedAnimalMedication, setSelectedAnimalMedication] =
    useState<AnimalMedicationModel>()

  const openNewAnimalMedicationForm = useCallback(() => {
    setIsOpenNewAnimalMedicationForm(true)
  }, [])

  const closeNewAnimalMedicationForm = useCallback(() => {
    setIsOpenNewAnimalMedicationForm(false)
  }, [])

  const openEditAnimalMedicationForm = useCallback(
    (animalMedication: AnimalMedicationModel) => {
      setSelectedAnimalMedication(animalMedication)
      setIsOpenEditAnimalMedicationForm(true)
    },
    []
  )

  const closeEditAnimalMedicationForm = useCallback(() => {
    setSelectedAnimalMedication(undefined)
    setIsOpenEditAnimalMedicationForm(false)
  }, [])

  const openDeleteAnimalMedicationContainer = useCallback(
    (animalMedication: AnimalMedicationModel) => {
      setSelectedAnimalMedication(animalMedication)
      setIsOpenDeleteAnimalMedicationContainer(true)
    },
    []
  )

  const closeDeleteAnimalMedicationContainer = useCallback(() => {
    setSelectedAnimalMedication(undefined)
    setIsOpenDeleteAnimalMedicationContainer(false)
  }, [])

  const providerValues = useMemo(
    () => ({
      propertyId: Number(params.propertyId),
      animalId,
      filters,
      handleChangeFilters,
      selectedAnimalMedication,
      isOpenNewAnimalMedicationForm,
      isOpenEditAnimalMedicationForm,
      isOpenDeleteAnimalMedicationContainer,
      openNewAnimalMedicationForm,
      closeNewAnimalMedicationForm,
      openEditAnimalMedicationForm,
      closeEditAnimalMedicationForm,
      openDeleteAnimalMedicationContainer,
      closeDeleteAnimalMedicationContainer,
    }),
    [
      params.propertyId,
      animalId,
      filters,
      handleChangeFilters,
      selectedAnimalMedication,
      isOpenNewAnimalMedicationForm,
      isOpenEditAnimalMedicationForm,
      isOpenDeleteAnimalMedicationContainer,
      openNewAnimalMedicationForm,
      closeNewAnimalMedicationForm,
      openEditAnimalMedicationForm,
      closeEditAnimalMedicationForm,
      openDeleteAnimalMedicationContainer,
      closeDeleteAnimalMedicationContainer,
    ]
  )

  return (
    <AnimalMedicationContext.Provider value={providerValues}>
      {children}
    </AnimalMedicationContext.Provider>
  )
}
