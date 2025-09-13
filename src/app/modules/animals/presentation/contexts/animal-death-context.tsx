import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'

import { useParams } from 'react-router-dom'

import type { AnimalDeathModel } from '../../domain/models/animal-deaths-model'
import type { AnimalDeathFilters } from '../types/animal-death-types'

type AnimalDeathValue = {
  propertyId: number
  animalId: number
  selectedAnimalDeath?: AnimalDeathModel
  filters: AnimalDeathFilters
  handleChangeFilters: (newFilters: AnimalDeathFilters) => void
  isOpenNewAnimalDeathForm: boolean
  isOpenEditAnimalDeathForm: boolean
  isOpenDeleteAnimalDeathContainer: boolean
  openNewAnimalDeathForm: () => void
  closeNewAnimalDeathForm: () => void
  openEditAnimalDeathForm: (animalDeath: AnimalDeathModel) => void
  closeEditAnimalDeathForm: () => void
  openDeleteAnimalDeathContainer: (animalDeath: AnimalDeathModel) => void
  closeDeleteAnimalDeathContainer: () => void
}

export const AnimalDeathContext = createContext<AnimalDeathValue>(
  {} as AnimalDeathValue
)

type AnimalDeathProviderProps = PropsWithChildren<{
  animalId: number
}>

export function AnimalDeathProvider({
  children,
  animalId,
}: AnimalDeathProviderProps) {
  const params = useParams<{ propertyId: string }>()

  const [filters, setFilters] = useState<AnimalDeathFilters>({})

  const handleChangeFilters = useCallback((newFilters: AnimalDeathFilters) => {
    setFilters((prevState) => ({
      ...prevState,
      ...newFilters,
    }))
  }, [])

  const [isOpenNewAnimalDeathForm, setIsOpenNewAnimalDeathForm] =
    useState(false)

  const [isOpenEditAnimalDeathForm, setIsOpenEditAnimalDeathForm] =
    useState(false)

  const [
    isOpenDeleteAnimalDeathContainer,
    setIsOpenDeleteAnimalDeathContainer,
  ] = useState(false)

  const [selectedAnimalDeath, setSelectedAnimalDeath] =
    useState<AnimalDeathModel>()

  const openNewAnimalDeathForm = useCallback(() => {
    setIsOpenNewAnimalDeathForm(true)
  }, [])

  const closeNewAnimalDeathForm = useCallback(() => {
    setIsOpenNewAnimalDeathForm(false)
  }, [])

  const openEditAnimalDeathForm = useCallback(
    (animalDeath: AnimalDeathModel) => {
      setSelectedAnimalDeath(animalDeath)
      setIsOpenEditAnimalDeathForm(true)
    },
    []
  )

  const closeEditAnimalDeathForm = useCallback(() => {
    setSelectedAnimalDeath(undefined)
    setIsOpenEditAnimalDeathForm(false)
  }, [])

  const openDeleteAnimalDeathContainer = useCallback(
    (animalDeath: AnimalDeathModel) => {
      setSelectedAnimalDeath(animalDeath)
      setIsOpenDeleteAnimalDeathContainer(true)
    },
    []
  )

  const closeDeleteAnimalDeathContainer = useCallback(() => {
    setSelectedAnimalDeath(undefined)
    setIsOpenDeleteAnimalDeathContainer(false)
  }, [])

  const providerValues = useMemo(
    () => ({
      propertyId: Number(params.propertyId),
      animalId,
      filters,
      handleChangeFilters,
      selectedAnimalDeath,
      isOpenNewAnimalDeathForm,
      isOpenEditAnimalDeathForm,
      isOpenDeleteAnimalDeathContainer,
      openNewAnimalDeathForm,
      closeNewAnimalDeathForm,
      openEditAnimalDeathForm,
      closeEditAnimalDeathForm,
      openDeleteAnimalDeathContainer,
      closeDeleteAnimalDeathContainer,
    }),
    [
      params.propertyId,
      animalId,
      filters,
      handleChangeFilters,
      selectedAnimalDeath,
      isOpenNewAnimalDeathForm,
      isOpenEditAnimalDeathForm,
      isOpenDeleteAnimalDeathContainer,
      openNewAnimalDeathForm,
      closeNewAnimalDeathForm,
      openEditAnimalDeathForm,
      closeEditAnimalDeathForm,
      openDeleteAnimalDeathContainer,
      closeDeleteAnimalDeathContainer,
    ]
  )

  return (
    <AnimalDeathContext.Provider value={providerValues}>
      {children}
    </AnimalDeathContext.Provider>
  )
}
