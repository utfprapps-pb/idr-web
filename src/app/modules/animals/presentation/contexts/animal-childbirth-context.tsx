import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'

import { useParams } from 'react-router-dom'

import type { AnimalChildbirthModel } from '../../domain/models/animal-childbirths-model'
import type { AnimalChildbirthFilters } from '../types/animal-childbirth-types'

type AnimalChildbirthValue = {
  propertyId: string
  animalId: string
  selectedAnimalChildbirth?: AnimalChildbirthModel
  filters: AnimalChildbirthFilters
  handleChangeFilters: (newFilters: AnimalChildbirthFilters) => void
  isOpenNewAnimalChildbirthForm: boolean
  isOpenEditAnimalChildbirthForm: boolean
  isOpenDeleteAnimalChildbirthContainer: boolean
  openNewAnimalChildbirthForm: () => void
  closeNewAnimalChildbirthForm: () => void
  openEditAnimalChildbirthForm: (
    animalChildbirth: AnimalChildbirthModel
  ) => void
  closeEditAnimalChildbirthForm: () => void
  openDeleteAnimalChildbirthContainer: (
    animalChildbirth: AnimalChildbirthModel
  ) => void
  closeDeleteAnimalChildbirthContainer: () => void
}

export const AnimalChildbirthContext = createContext<AnimalChildbirthValue>(
  {} as AnimalChildbirthValue
)

type AnimalChildbirthProviderProps = PropsWithChildren<{
  animalId: string
}>

export function AnimalChildbirthProvider({
  children,
  animalId,
}: AnimalChildbirthProviderProps) {
  const params = useParams<{ propertyId: string }>()

  const [filters, setFilters] = useState<AnimalChildbirthFilters>({
    condition: '',
  })

  const handleChangeFilters = useCallback(
    (newFilters: AnimalChildbirthFilters) => {
      setFilters((prevState) => ({
        ...prevState,
        ...newFilters,
      }))
    },
    []
  )

  const [isOpenNewAnimalChildbirthForm, setIsOpenNewAnimalChildbirthForm] =
    useState(false)

  const [isOpenEditAnimalChildbirthForm, setIsOpenEditAnimalChildbirthForm] =
    useState(false)

  const [
    isOpenDeleteAnimalChildbirthContainer,
    setIsOpenDeleteAnimalChildbirthContainer,
  ] = useState(false)

  const [selectedAnimalChildbirth, setSelectedAnimalChildbirth] =
    useState<AnimalChildbirthModel>()

  const openNewAnimalChildbirthForm = useCallback(() => {
    setIsOpenNewAnimalChildbirthForm(true)
  }, [])

  const closeNewAnimalChildbirthForm = useCallback(() => {
    setIsOpenNewAnimalChildbirthForm(false)
  }, [])

  const openEditAnimalChildbirthForm = useCallback(
    (animalChildbirth: AnimalChildbirthModel) => {
      setSelectedAnimalChildbirth(animalChildbirth)
      setIsOpenEditAnimalChildbirthForm(true)
    },
    []
  )

  const closeEditAnimalChildbirthForm = useCallback(() => {
    setSelectedAnimalChildbirth(undefined)
    setIsOpenEditAnimalChildbirthForm(false)
  }, [])

  const openDeleteAnimalChildbirthContainer = useCallback(
    (animalChildbirth: AnimalChildbirthModel) => {
      setSelectedAnimalChildbirth(animalChildbirth)
      setIsOpenDeleteAnimalChildbirthContainer(true)
    },
    []
  )

  const closeDeleteAnimalChildbirthContainer = useCallback(() => {
    setSelectedAnimalChildbirth(undefined)
    setIsOpenDeleteAnimalChildbirthContainer(false)
  }, [])

  const providerValues = useMemo(
    () => ({
      propertyId: params.propertyId as string, // Typecast allowed to avoid undefined, as it has validation below
      animalId,
      filters,
      handleChangeFilters,
      selectedAnimalChildbirth,
      isOpenNewAnimalChildbirthForm,
      isOpenEditAnimalChildbirthForm,
      isOpenDeleteAnimalChildbirthContainer,
      openNewAnimalChildbirthForm,
      closeNewAnimalChildbirthForm,
      openEditAnimalChildbirthForm,
      closeEditAnimalChildbirthForm,
      openDeleteAnimalChildbirthContainer,
      closeDeleteAnimalChildbirthContainer,
    }),
    [
      params.propertyId,
      animalId,
      filters,
      handleChangeFilters,
      selectedAnimalChildbirth,
      isOpenNewAnimalChildbirthForm,
      isOpenEditAnimalChildbirthForm,
      isOpenDeleteAnimalChildbirthContainer,
      openNewAnimalChildbirthForm,
      closeNewAnimalChildbirthForm,
      openEditAnimalChildbirthForm,
      closeEditAnimalChildbirthForm,
      openDeleteAnimalChildbirthContainer,
      closeDeleteAnimalChildbirthContainer,
    ]
  )

  return (
    <AnimalChildbirthContext.Provider value={providerValues}>
      {children}
    </AnimalChildbirthContext.Provider>
  )
}
