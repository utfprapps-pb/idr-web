import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'

import { useParams } from 'react-router-dom'

import type { AnimalHeiferCalfStageModel } from '../../domain/models/animal-heifer-calf-stages-model'
import type { AnimalHeiferCalfStageFilters } from '../types/animal-heifer-calf-stage-types'

type AnimalHeiferCalfStageValue = {
  propertyId: string
  animalId: string
  selectedAnimalHeiferCalfStage?: AnimalHeiferCalfStageModel
  filters: AnimalHeiferCalfStageFilters
  handleChangeFilters: (newFilters: AnimalHeiferCalfStageFilters) => void
  isOpenNewAnimalHeiferCalfStageForm: boolean
  isOpenEditAnimalHeiferCalfStageForm: boolean
  isOpenDeleteAnimalHeiferCalfStageContainer: boolean
  openNewAnimalHeiferCalfStageForm: () => void
  closeNewAnimalHeiferCalfStageForm: () => void
  openEditAnimalHeiferCalfStageForm: (
    animalHeiferCalfStage: AnimalHeiferCalfStageModel
  ) => void
  closeEditAnimalHeiferCalfStageForm: () => void
  openDeleteAnimalHeiferCalfStageContainer: (
    animalHeiferCalfStage: AnimalHeiferCalfStageModel
  ) => void
  closeDeleteAnimalHeiferCalfStageContainer: () => void
}

export const AnimalHeiferCalfStageContext =
  createContext<AnimalHeiferCalfStageValue>({} as AnimalHeiferCalfStageValue)

type AnimalHeiferCalfStageProviderProps = PropsWithChildren<{
  animalId: string
}>

export function AnimalHeiferCalfStageProvider({
  children,
  animalId,
}: AnimalHeiferCalfStageProviderProps) {
  const params = useParams<{ propertyId: string }>()

  const [filters, setFilters] = useState<AnimalHeiferCalfStageFilters>({})

  const handleChangeFilters = useCallback(
    (newFilters: AnimalHeiferCalfStageFilters) => {
      setFilters((prevState) => ({
        ...prevState,
        ...newFilters,
      }))
    },
    []
  )

  const [
    isOpenNewAnimalHeiferCalfStageForm,
    setIsOpenNewAnimalHeiferCalfStageForm,
  ] = useState(false)

  const [
    isOpenEditAnimalHeiferCalfStageForm,
    setIsOpenEditAnimalHeiferCalfStageForm,
  ] = useState(false)

  const [
    isOpenDeleteAnimalHeiferCalfStageContainer,
    setIsOpenDeleteAnimalHeiferCalfStageContainer,
  ] = useState(false)

  const [selectedAnimalHeiferCalfStage, setSelectedAnimalHeiferCalfStage] =
    useState<AnimalHeiferCalfStageModel>()

  const openNewAnimalHeiferCalfStageForm = useCallback(() => {
    setIsOpenNewAnimalHeiferCalfStageForm(true)
  }, [])

  const closeNewAnimalHeiferCalfStageForm = useCallback(() => {
    setIsOpenNewAnimalHeiferCalfStageForm(false)
  }, [])

  const openEditAnimalHeiferCalfStageForm = useCallback(
    (animalHeiferCalfStage: AnimalHeiferCalfStageModel) => {
      setSelectedAnimalHeiferCalfStage(animalHeiferCalfStage)
      setIsOpenEditAnimalHeiferCalfStageForm(true)
    },
    []
  )

  const closeEditAnimalHeiferCalfStageForm = useCallback(() => {
    setSelectedAnimalHeiferCalfStage(undefined)
    setIsOpenEditAnimalHeiferCalfStageForm(false)
  }, [])

  const openDeleteAnimalHeiferCalfStageContainer = useCallback(
    (animalHeiferCalfStage: AnimalHeiferCalfStageModel) => {
      setSelectedAnimalHeiferCalfStage(animalHeiferCalfStage)
      setIsOpenDeleteAnimalHeiferCalfStageContainer(true)
    },
    []
  )

  const closeDeleteAnimalHeiferCalfStageContainer = useCallback(() => {
    setSelectedAnimalHeiferCalfStage(undefined)
    setIsOpenDeleteAnimalHeiferCalfStageContainer(false)
  }, [])

  const providerValues = useMemo(
    () => ({
      propertyId: params.propertyId as string, // Typecast allowed to avoid undefined, as it has validation below
      animalId,
      filters,
      handleChangeFilters,
      selectedAnimalHeiferCalfStage,
      isOpenNewAnimalHeiferCalfStageForm,
      isOpenEditAnimalHeiferCalfStageForm,
      isOpenDeleteAnimalHeiferCalfStageContainer,
      openNewAnimalHeiferCalfStageForm,
      closeNewAnimalHeiferCalfStageForm,
      openEditAnimalHeiferCalfStageForm,
      closeEditAnimalHeiferCalfStageForm,
      openDeleteAnimalHeiferCalfStageContainer,
      closeDeleteAnimalHeiferCalfStageContainer,
    }),
    [
      params.propertyId,
      animalId,
      filters,
      handleChangeFilters,
      selectedAnimalHeiferCalfStage,
      isOpenNewAnimalHeiferCalfStageForm,
      isOpenEditAnimalHeiferCalfStageForm,
      isOpenDeleteAnimalHeiferCalfStageContainer,
      openNewAnimalHeiferCalfStageForm,
      closeNewAnimalHeiferCalfStageForm,
      openEditAnimalHeiferCalfStageForm,
      closeEditAnimalHeiferCalfStageForm,
      openDeleteAnimalHeiferCalfStageContainer,
      closeDeleteAnimalHeiferCalfStageContainer,
    ]
  )

  return (
    <AnimalHeiferCalfStageContext.Provider value={providerValues}>
      {children}
    </AnimalHeiferCalfStageContext.Provider>
  )
}
