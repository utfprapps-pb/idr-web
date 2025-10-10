import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'

import { useParams } from 'react-router-dom'

import type { AnimalInseminationModel } from '../../domain/models/animal-inseminations-model'
import type { AnimalInseminationFilters } from '../types/animal-insemination-types'

type AnimalInseminationContextValue = {
  propertyId: number
  animalId: number
  selectedAnimalInsemination?: AnimalInseminationModel
  filters: AnimalInseminationFilters
  handleChangeFilters: (newFilters: AnimalInseminationFilters) => void
  isOpenNewAnimalInseminationForm: boolean
  isOpenEditAnimalInseminationForm: boolean
  isOpenDeleteAnimalInseminationContainer: boolean
  openNewAnimalInseminationForm: () => void
  closeNewAnimalInseminationForm: () => void
  openEditAnimalInseminationForm: (
    animalInsemination: AnimalInseminationModel
  ) => void
  closeEditAnimalInseminationForm: () => void
  openDeleteAnimalInseminationContainer: (
    animalInsemination: AnimalInseminationModel
  ) => void
  closeDeleteAnimalInseminationContainer: () => void
}

export const AnimalInseminationContext =
  createContext<AnimalInseminationContextValue>(
    {} as AnimalInseminationContextValue
  )

type AnimalInseminationProviderProps = PropsWithChildren<{
  animalId: number
}>

export function AnimalInseminationProvider({
  children,
  animalId,
}: AnimalInseminationProviderProps) {
  const params = useParams<{ propertyId: string }>()

  const [filters, setFilters] = useState<AnimalInseminationFilters>({})

  const handleChangeFilters = useCallback(
    (newFilters: AnimalInseminationFilters) => {
      setFilters((prevState) => ({
        ...prevState,
        ...newFilters,
      }))
    },
    []
  )

  const [isOpenNewAnimalInseminationForm, setIsOpenNewAnimalInseminationForm] =
    useState(false)

  const [
    isOpenEditAnimalInseminationForm,
    setIsOpenEditAnimalInseminationForm,
  ] = useState(false)

  const [
    isOpenDeleteAnimalInseminationContainer,
    setIsOpenDeleteAnimalInseminationContainer,
  ] = useState(false)

  const [selectedAnimalInsemination, setSelectedAnimalInsemination] =
    useState<AnimalInseminationModel>()

  const openNewAnimalInseminationForm = useCallback(() => {
    setIsOpenNewAnimalInseminationForm(true)
  }, [])

  const closeNewAnimalInseminationForm = useCallback(() => {
    setIsOpenNewAnimalInseminationForm(false)
  }, [])

  const openEditAnimalInseminationForm = useCallback(
    (animalInsemination: AnimalInseminationModel) => {
      setSelectedAnimalInsemination(animalInsemination)
      setIsOpenEditAnimalInseminationForm(true)
    },
    []
  )

  const closeEditAnimalInseminationForm = useCallback(() => {
    setSelectedAnimalInsemination(undefined)
    setIsOpenEditAnimalInseminationForm(false)
  }, [])

  const openDeleteAnimalInseminationContainer = useCallback(
    (animalInsemination: AnimalInseminationModel) => {
      setSelectedAnimalInsemination(animalInsemination)
      setIsOpenDeleteAnimalInseminationContainer(true)
    },
    []
  )

  const closeDeleteAnimalInseminationContainer = useCallback(() => {
    setSelectedAnimalInsemination(undefined)
    setIsOpenDeleteAnimalInseminationContainer(false)
  }, [])

  const providerValues = useMemo(
    () => ({
      propertyId: Number(params.propertyId),
      animalId,
      filters,
      handleChangeFilters,
      selectedAnimalInsemination,
      isOpenNewAnimalInseminationForm,
      isOpenEditAnimalInseminationForm,
      isOpenDeleteAnimalInseminationContainer,
      openNewAnimalInseminationForm,
      closeNewAnimalInseminationForm,
      openEditAnimalInseminationForm,
      closeEditAnimalInseminationForm,
      openDeleteAnimalInseminationContainer,
      closeDeleteAnimalInseminationContainer,
    }),
    [
      params.propertyId,
      animalId,
      filters,
      handleChangeFilters,
      selectedAnimalInsemination,
      isOpenNewAnimalInseminationForm,
      isOpenEditAnimalInseminationForm,
      isOpenDeleteAnimalInseminationContainer,
      openNewAnimalInseminationForm,
      closeNewAnimalInseminationForm,
      openEditAnimalInseminationForm,
      closeEditAnimalInseminationForm,
      openDeleteAnimalInseminationContainer,
      closeDeleteAnimalInseminationContainer,
    ]
  )

  return (
    <AnimalInseminationContext.Provider value={providerValues}>
      {children}
    </AnimalInseminationContext.Provider>
  )
}
