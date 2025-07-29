import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'

import { useParams } from 'react-router-dom'

import type { AnimalModel } from '../../domain/models/animals-model'
import type { AnimalFilters } from '../types/animal-types'

type AnimalContextValue = {
  propertyId: string
  filters: AnimalFilters
  handleChangeFilters: (newFilters: AnimalFilters) => void
  selectedAnimal?: AnimalModel
  isOpenNewAnimalForm: boolean
  isOpenEditAnimalForm: boolean
  isOpenDeleteAnimalContainer: boolean
  openNewAnimalForm: () => void
  closeNewAnimalForm: () => void
  openEditAnimalForm: (animal: AnimalModel) => void
  closeEditAnimalForm: () => void
  openDeleteAnimalContainer: (animal: AnimalModel) => void
  closeDeleteAnimalContainer: () => void
}

export const AnimalContext = createContext<AnimalContextValue>(
  {} as AnimalContextValue
)

export function AnimalProvider({ children }: PropsWithChildren) {
  const params = useParams<{ propertyId: string }>()

  const [filters, setFilters] = useState<AnimalFilters>({
    name: '',
  })

  const handleChangeFilters = useCallback((newFilters: AnimalFilters) => {
    setFilters((prevState) => ({
      ...prevState,
      ...newFilters,
    }))
  }, [])

  const [isOpenNewAnimalForm, setIsOpenNewAnimalForm] = useState(false)

  const [isOpenEditAnimalForm, setIsOpenEditAnimalForm] = useState(false)

  const [isOpenDeleteAnimalContainer, setIsOpenDeleteAnimalContainer] =
    useState(false)

  const [selectedAnimal, setSelectedAnimal] = useState<AnimalModel>()

  const openNewAnimalForm = useCallback(() => {
    setIsOpenNewAnimalForm(true)
  }, [])

  const closeNewAnimalForm = useCallback(() => {
    setIsOpenNewAnimalForm(false)
  }, [])

  const openEditAnimalForm = useCallback((animal: AnimalModel) => {
    setSelectedAnimal(animal)
    setIsOpenEditAnimalForm(true)
  }, [])

  const closeEditAnimalForm = useCallback(() => {
    setSelectedAnimal(undefined)
    setIsOpenEditAnimalForm(false)
  }, [])

  const openDeleteAnimalContainer = useCallback((animal: AnimalModel) => {
    setSelectedAnimal(animal)
    setIsOpenDeleteAnimalContainer(true)
  }, [])

  const closeDeleteAnimalContainer = useCallback(() => {
    setSelectedAnimal(undefined)
    setIsOpenDeleteAnimalContainer(false)
  }, [])

  const providerValues = useMemo(
    () => ({
      propertyId: params.propertyId as string, // Typecast allowed to avoid undefined, as it has validation below
      filters,
      handleChangeFilters,
      selectedAnimal,
      isOpenNewAnimalForm,
      isOpenEditAnimalForm,
      isOpenDeleteAnimalContainer,
      openNewAnimalForm,
      closeNewAnimalForm,
      openEditAnimalForm,
      closeEditAnimalForm,
      openDeleteAnimalContainer,
      closeDeleteAnimalContainer,
    }),
    [
      params.propertyId,
      filters,
      handleChangeFilters,
      selectedAnimal,
      isOpenNewAnimalForm,
      isOpenEditAnimalForm,
      isOpenDeleteAnimalContainer,
      openNewAnimalForm,
      closeNewAnimalForm,
      openEditAnimalForm,
      closeEditAnimalForm,
      openDeleteAnimalContainer,
      closeDeleteAnimalContainer,
    ]
  )

  if (!params.propertyId) {
    return null
  }

  return (
    <AnimalContext.Provider value={providerValues}>
      {children}
    </AnimalContext.Provider>
  )
}

AnimalProvider.displayName = 'AnimalProvider'
