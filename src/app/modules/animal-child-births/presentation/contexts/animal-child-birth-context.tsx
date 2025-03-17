import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'

import { useParams } from 'react-router-dom'

import type { AnimalChildBirthModel } from '../../domain/models/animal-child-births-model'
import type { AnimalChildBirthFilters } from '../types'

type AnimalChildBirthValue = {
  propertyId: string
  animalId: string
  selectedAnimalChildBirth?: AnimalChildBirthModel
  filters: AnimalChildBirthFilters
  handleChangeFilters: (newFilters: AnimalChildBirthFilters) => void
  isOpenNewAnimalChildBirthForm: boolean
  isOpenEditAnimalChildBirthForm: boolean
  isOpenDeleteAnimalChildBirthContainer: boolean
  openNewAnimalChildBirthForm: () => void
  closeNewAnimalChildBirthForm: () => void
  openEditAnimalChildBirthForm: (
    animalChildBirth: AnimalChildBirthModel
  ) => void
  closeEditAnimalChildBirthForm: () => void
  openDeleteAnimalChildBirthContainer: (
    animalChildBirth: AnimalChildBirthModel
  ) => void
  closeDeleteAnimalChildBirthContainer: () => void
}

export const AnimalChildBirthContext = createContext<AnimalChildBirthValue>(
  {} as AnimalChildBirthValue
)

export function AnimalChildBirthProvider({ children }: PropsWithChildren) {
  const params = useParams<{ propertyId: string; animalId: string }>()

  const [filters, setFilters] = useState<AnimalChildBirthFilters>({
    condition: '',
  })

  const handleChangeFilters = useCallback(
    (newFilters: AnimalChildBirthFilters) => {
      setFilters((prevState) => ({
        ...prevState,
        ...newFilters,
      }))
    },
    []
  )

  const [isOpenNewAnimalChildBirthForm, setIsOpenNewAnimalChildBirthForm] =
    useState(false)

  const [isOpenEditAnimalChildBirthForm, setIsOpenEditAnimalChildBirthForm] =
    useState(false)

  const [
    isOpenDeleteAnimalChildBirthContainer,
    setIsOpenDeleteAnimalChildBirthContainer,
  ] = useState(false)

  const [selectedAnimalChildBirth, setSelectedAnimalChildBirth] =
    useState<AnimalChildBirthModel>()

  const openNewAnimalChildBirthForm = useCallback(() => {
    setIsOpenNewAnimalChildBirthForm(true)
  }, [])

  const closeNewAnimalChildBirthForm = useCallback(() => {
    setIsOpenNewAnimalChildBirthForm(false)
  }, [])

  const openEditAnimalChildBirthForm = useCallback(
    (animalChildBirth: AnimalChildBirthModel) => {
      setSelectedAnimalChildBirth(animalChildBirth)
      setIsOpenEditAnimalChildBirthForm(true)
    },
    []
  )

  const closeEditAnimalChildBirthForm = useCallback(() => {
    setSelectedAnimalChildBirth(undefined)
    setIsOpenEditAnimalChildBirthForm(false)
  }, [])

  const openDeleteAnimalChildBirthContainer = useCallback(
    (animalChildBirth: AnimalChildBirthModel) => {
      setSelectedAnimalChildBirth(animalChildBirth)
      setIsOpenDeleteAnimalChildBirthContainer(true)
    },
    []
  )

  const closeDeleteAnimalChildBirthContainer = useCallback(() => {
    setSelectedAnimalChildBirth(undefined)
    setIsOpenDeleteAnimalChildBirthContainer(false)
  }, [])

  const providerValues = useMemo(
    () => ({
      propertyId: params.propertyId as string, // Typecast allowed to avoid undefined, as it has validation below
      animalId: params.animalId as string, // Typecast allowed to avoid undefined, as it has validation below
      filters,
      handleChangeFilters,
      selectedAnimalChildBirth,
      isOpenNewAnimalChildBirthForm,
      isOpenEditAnimalChildBirthForm,
      isOpenDeleteAnimalChildBirthContainer,
      openNewAnimalChildBirthForm,
      closeNewAnimalChildBirthForm,
      openEditAnimalChildBirthForm,
      closeEditAnimalChildBirthForm,
      openDeleteAnimalChildBirthContainer,
      closeDeleteAnimalChildBirthContainer,
    }),
    [
      params.propertyId,
      params.animalId,
      filters,
      handleChangeFilters,
      selectedAnimalChildBirth,
      isOpenNewAnimalChildBirthForm,
      isOpenEditAnimalChildBirthForm,
      isOpenDeleteAnimalChildBirthContainer,
      openNewAnimalChildBirthForm,
      closeNewAnimalChildBirthForm,
      openEditAnimalChildBirthForm,
      closeEditAnimalChildBirthForm,
      openDeleteAnimalChildBirthContainer,
      closeDeleteAnimalChildBirthContainer,
    ]
  )

  return (
    <AnimalChildBirthContext.Provider value={providerValues}>
      {children}
    </AnimalChildBirthContext.Provider>
  )
}
