import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'

import { useParams } from 'react-router-dom'

import type { AnimalDiseaseModel } from '../../domain/models/animal-diseases-model'
import type { AnimalDiseaseFilters } from '../types/animal-disease-types'

type AnimalDiseaseValue = {
  propertyId: string
  animalId: string
  selectedAnimalDisease?: AnimalDiseaseModel
  filters: AnimalDiseaseFilters
  handleChangeFilters: (newFilters: AnimalDiseaseFilters) => void
  isOpenNewAnimalDiseaseForm: boolean
  isOpenEditAnimalDiseaseForm: boolean
  isOpenDeleteAnimalDiseaseContainer: boolean
  openNewAnimalDiseaseForm: () => void
  closeNewAnimalDiseaseForm: () => void
  openEditAnimalDiseaseForm: (animalDisease: AnimalDiseaseModel) => void
  closeEditAnimalDiseaseForm: () => void
  openDeleteAnimalDiseaseContainer: (animalDisease: AnimalDiseaseModel) => void
  closeDeleteAnimalDiseaseContainer: () => void
}

export const AnimalDiseaseContext = createContext<AnimalDiseaseValue>(
  {} as AnimalDiseaseValue
)

type AnimalDiseaseProviderProps = PropsWithChildren<{
  animalId: string
}>

export function AnimalDiseaseProvider({
  children,
  animalId,
}: AnimalDiseaseProviderProps) {
  const params = useParams<{ propertyId: string }>()

  const [filters, setFilters] = useState<AnimalDiseaseFilters>({})

  const handleChangeFilters = useCallback(
    (newFilters: AnimalDiseaseFilters) => {
      setFilters((prevState) => ({
        ...prevState,
        ...newFilters,
      }))
    },
    []
  )

  const [isOpenNewAnimalDiseaseForm, setIsOpenNewAnimalDiseaseForm] =
    useState(false)

  const [isOpenEditAnimalDiseaseForm, setIsOpenEditAnimalDiseaseForm] =
    useState(false)

  const [
    isOpenDeleteAnimalDiseaseContainer,
    setIsOpenDeleteAnimalDiseaseContainer,
  ] = useState(false)

  const [selectedAnimalDisease, setSelectedAnimalDisease] =
    useState<AnimalDiseaseModel>()

  const openNewAnimalDiseaseForm = useCallback(() => {
    setIsOpenNewAnimalDiseaseForm(true)
  }, [])

  const closeNewAnimalDiseaseForm = useCallback(() => {
    setIsOpenNewAnimalDiseaseForm(false)
  }, [])

  const openEditAnimalDiseaseForm = useCallback(
    (animalDisease: AnimalDiseaseModel) => {
      setSelectedAnimalDisease(animalDisease)
      setIsOpenEditAnimalDiseaseForm(true)
    },
    []
  )

  const closeEditAnimalDiseaseForm = useCallback(() => {
    setSelectedAnimalDisease(undefined)
    setIsOpenEditAnimalDiseaseForm(false)
  }, [])

  const openDeleteAnimalDiseaseContainer = useCallback(
    (animalDisease: AnimalDiseaseModel) => {
      setSelectedAnimalDisease(animalDisease)
      setIsOpenDeleteAnimalDiseaseContainer(true)
    },
    []
  )

  const closeDeleteAnimalDiseaseContainer = useCallback(() => {
    setSelectedAnimalDisease(undefined)
    setIsOpenDeleteAnimalDiseaseContainer(false)
  }, [])

  const providerValues = useMemo(
    () => ({
      propertyId: params.propertyId as string, // Typecast allowed to avoid undefined, as it has validation below
      animalId,
      filters,
      handleChangeFilters,
      selectedAnimalDisease,
      isOpenNewAnimalDiseaseForm,
      isOpenEditAnimalDiseaseForm,
      isOpenDeleteAnimalDiseaseContainer,
      openNewAnimalDiseaseForm,
      closeNewAnimalDiseaseForm,
      openEditAnimalDiseaseForm,
      closeEditAnimalDiseaseForm,
      openDeleteAnimalDiseaseContainer,
      closeDeleteAnimalDiseaseContainer,
    }),
    [
      params.propertyId,
      animalId,
      filters,
      handleChangeFilters,
      selectedAnimalDisease,
      isOpenNewAnimalDiseaseForm,
      isOpenEditAnimalDiseaseForm,
      isOpenDeleteAnimalDiseaseContainer,
      openNewAnimalDiseaseForm,
      closeNewAnimalDiseaseForm,
      openEditAnimalDiseaseForm,
      closeEditAnimalDiseaseForm,
      openDeleteAnimalDiseaseContainer,
      closeDeleteAnimalDiseaseContainer,
    ]
  )

  return (
    <AnimalDiseaseContext.Provider value={providerValues}>
      {children}
    </AnimalDiseaseContext.Provider>
  )
}
