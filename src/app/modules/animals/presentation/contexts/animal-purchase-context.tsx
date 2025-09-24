import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'

import { useParams } from 'react-router-dom'

import type { AnimalPurchaseModel } from '../../domain/models/animal-purchases-model'
import type { AnimalPurchaseFilters } from '../types/animal-purchase-types'

type AnimalPurchaseValue = {
  propertyId: number
  animalId: number
  selectedAnimalPurchase?: AnimalPurchaseModel
  filters: AnimalPurchaseFilters
  handleChangeFilters: (newFilters: AnimalPurchaseFilters) => void
  isOpenNewAnimalPurchaseForm: boolean
  isOpenEditAnimalPurchaseForm: boolean
  isOpenDeleteAnimalPurchaseContainer: boolean
  openNewAnimalPurchaseForm: () => void
  closeNewAnimalPurchaseForm: () => void
  openEditAnimalPurchaseForm: (animalPurchase: AnimalPurchaseModel) => void
  closeEditAnimalPurchaseForm: () => void
  openDeleteAnimalPurchaseContainer: (
    animalPurchase: AnimalPurchaseModel
  ) => void
  closeDeleteAnimalPurchaseContainer: () => void
}

export const AnimalPurchaseContext = createContext<AnimalPurchaseValue>(
  {} as AnimalPurchaseValue
)

type AnimalPurchaseProviderProps = PropsWithChildren<{
  animalId: number
}>

export function AnimalPurchaseProvider({
  children,
  animalId,
}: AnimalPurchaseProviderProps) {
  const params = useParams<{ propertyId: string }>()

  const [filters, setFilters] = useState<AnimalPurchaseFilters>({})

  const handleChangeFilters = useCallback(
    (newFilters: AnimalPurchaseFilters) => {
      setFilters((prevState) => ({
        ...prevState,
        ...newFilters,
      }))
    },
    []
  )

  const [isOpenNewAnimalPurchaseForm, setIsOpenNewAnimalPurchaseForm] =
    useState(false)

  const [isOpenEditAnimalPurchaseForm, setIsOpenEditAnimalPurchaseForm] =
    useState(false)

  const [
    isOpenDeleteAnimalPurchaseContainer,
    setIsOpenDeleteAnimalPurchaseContainer,
  ] = useState(false)

  const [selectedAnimalPurchase, setSelectedAnimalPurchase] =
    useState<AnimalPurchaseModel>()

  const openNewAnimalPurchaseForm = useCallback(() => {
    setIsOpenNewAnimalPurchaseForm(true)
  }, [])

  const closeNewAnimalPurchaseForm = useCallback(() => {
    setIsOpenNewAnimalPurchaseForm(false)
  }, [])

  const openEditAnimalPurchaseForm = useCallback(
    (animalPurchase: AnimalPurchaseModel) => {
      setSelectedAnimalPurchase(animalPurchase)
      setIsOpenEditAnimalPurchaseForm(true)
    },
    []
  )

  const closeEditAnimalPurchaseForm = useCallback(() => {
    setSelectedAnimalPurchase(undefined)
    setIsOpenEditAnimalPurchaseForm(false)
  }, [])

  const openDeleteAnimalPurchaseContainer = useCallback(
    (animalPurchase: AnimalPurchaseModel) => {
      setSelectedAnimalPurchase(animalPurchase)
      setIsOpenDeleteAnimalPurchaseContainer(true)
    },
    []
  )

  const closeDeleteAnimalPurchaseContainer = useCallback(() => {
    setSelectedAnimalPurchase(undefined)
    setIsOpenDeleteAnimalPurchaseContainer(false)
  }, [])

  const providerValues = useMemo(
    () => ({
      propertyId: Number(params.propertyId),
      animalId,
      filters,
      handleChangeFilters,
      selectedAnimalPurchase,
      isOpenNewAnimalPurchaseForm,
      isOpenEditAnimalPurchaseForm,
      isOpenDeleteAnimalPurchaseContainer,
      openNewAnimalPurchaseForm,
      closeNewAnimalPurchaseForm,
      openEditAnimalPurchaseForm,
      closeEditAnimalPurchaseForm,
      openDeleteAnimalPurchaseContainer,
      closeDeleteAnimalPurchaseContainer,
    }),
    [
      params.propertyId,
      animalId,
      filters,
      handleChangeFilters,
      selectedAnimalPurchase,
      isOpenNewAnimalPurchaseForm,
      isOpenEditAnimalPurchaseForm,
      isOpenDeleteAnimalPurchaseContainer,
      openNewAnimalPurchaseForm,
      closeNewAnimalPurchaseForm,
      openEditAnimalPurchaseForm,
      closeEditAnimalPurchaseForm,
      openDeleteAnimalPurchaseContainer,
      closeDeleteAnimalPurchaseContainer,
    ]
  )

  return (
    <AnimalPurchaseContext.Provider value={providerValues}>
      {children}
    </AnimalPurchaseContext.Provider>
  )
}
