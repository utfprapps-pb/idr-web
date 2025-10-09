import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'

import { useParams } from 'react-router-dom'

import type { AnimalMastitisModel } from '../../domain/models/animal-mastitides-model'
import type { AnimalMastitisFilters } from '../types/animal-mastitis-types'

type AnimalMastitisContextValue = {
  propertyId: number
  animalId: number
  selectedAnimalMastitis?: AnimalMastitisModel
  filters: AnimalMastitisFilters
  handleChangeFilters: (newFilters: AnimalMastitisFilters) => void
  isOpenNewAnimalMastitisForm: boolean
  isOpenEditAnimalMastitisForm: boolean
  isOpenDeleteAnimalMastitisContainer: boolean
  openNewAnimalMastitisForm: () => void
  closeNewAnimalMastitisForm: () => void
  openEditAnimalMastitisForm: (animalMastitis: AnimalMastitisModel) => void
  closeEditAnimalMastitisForm: () => void
  openDeleteAnimalMastitisContainer: (
    animalMastitis: AnimalMastitisModel
  ) => void
  closeDeleteAnimalMastitisContainer: () => void
}

export const AnimalMastitisContext = createContext<AnimalMastitisContextValue>(
  {} as AnimalMastitisContextValue
)

type AnimalMastitisProviderProps = PropsWithChildren<{
  animalId: number
}>

export function AnimalMastitisProvider({
  children,
  animalId,
}: AnimalMastitisProviderProps) {
  const params = useParams<{ propertyId: string }>()

  const [filters, setFilters] = useState<AnimalMastitisFilters>({})

  const handleChangeFilters = useCallback(
    (newFilters: AnimalMastitisFilters) => {
      setFilters((prevState) => ({
        ...prevState,
        ...newFilters,
      }))
    },
    []
  )

  const [isOpenNewAnimalMastitisForm, setIsOpenNewAnimalMastitisForm] =
    useState(false)

  const [isOpenEditAnimalMastitisForm, setIsOpenEditAnimalMastitisForm] =
    useState(false)

  const [
    isOpenDeleteAnimalMastitisContainer,
    setIsOpenDeleteAnimalMastitisContainer,
  ] = useState(false)

  const [selectedAnimalMastitis, setSelectedAnimalMastitis] =
    useState<AnimalMastitisModel>()

  const openNewAnimalMastitisForm = useCallback(() => {
    setIsOpenNewAnimalMastitisForm(true)
  }, [])

  const closeNewAnimalMastitisForm = useCallback(() => {
    setIsOpenNewAnimalMastitisForm(false)
  }, [])

  const openEditAnimalMastitisForm = useCallback(
    (animalMastitis: AnimalMastitisModel) => {
      setSelectedAnimalMastitis(animalMastitis)
      setIsOpenEditAnimalMastitisForm(true)
    },
    []
  )

  const closeEditAnimalMastitisForm = useCallback(() => {
    setSelectedAnimalMastitis(undefined)
    setIsOpenEditAnimalMastitisForm(false)
  }, [])

  const openDeleteAnimalMastitisContainer = useCallback(
    (animalMastitis: AnimalMastitisModel) => {
      setSelectedAnimalMastitis(animalMastitis)
      setIsOpenDeleteAnimalMastitisContainer(true)
    },
    []
  )

  const closeDeleteAnimalMastitisContainer = useCallback(() => {
    setSelectedAnimalMastitis(undefined)
    setIsOpenDeleteAnimalMastitisContainer(false)
  }, [])

  const providerValues = useMemo(
    () => ({
      propertyId: Number(params.propertyId),
      animalId,
      filters,
      handleChangeFilters,
      selectedAnimalMastitis,
      isOpenNewAnimalMastitisForm,
      isOpenEditAnimalMastitisForm,
      isOpenDeleteAnimalMastitisContainer,
      openNewAnimalMastitisForm,
      closeNewAnimalMastitisForm,
      openEditAnimalMastitisForm,
      closeEditAnimalMastitisForm,
      openDeleteAnimalMastitisContainer,
      closeDeleteAnimalMastitisContainer,
    }),
    [
      params.propertyId,
      animalId,
      filters,
      handleChangeFilters,
      selectedAnimalMastitis,
      isOpenNewAnimalMastitisForm,
      isOpenEditAnimalMastitisForm,
      isOpenDeleteAnimalMastitisContainer,
      openNewAnimalMastitisForm,
      closeNewAnimalMastitisForm,
      openEditAnimalMastitisForm,
      closeEditAnimalMastitisForm,
      openDeleteAnimalMastitisContainer,
      closeDeleteAnimalMastitisContainer,
    ]
  )

  return (
    <AnimalMastitisContext.Provider value={providerValues}>
      {children}
    </AnimalMastitisContext.Provider>
  )
}
