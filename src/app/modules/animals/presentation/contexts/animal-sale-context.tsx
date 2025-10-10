import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'

import { useParams } from 'react-router-dom'

import type { AnimalSaleModel } from '../../domain/models/animal-sales-model'
import type { AnimalSaleFilters } from '../types/animal-sale-types'

type AnimalSaleValue = {
  propertyId: number
  animalId: number
  selectedAnimalSale?: AnimalSaleModel
  filters: AnimalSaleFilters
  handleChangeFilters: (newFilters: AnimalSaleFilters) => void
  isOpenNewAnimalSaleForm: boolean
  isOpenEditAnimalSaleForm: boolean
  isOpenDeleteAnimalSaleContainer: boolean
  openNewAnimalSaleForm: () => void
  closeNewAnimalSaleForm: () => void
  openEditAnimalSaleForm: (animalSale: AnimalSaleModel) => void
  closeEditAnimalSaleForm: () => void
  openDeleteAnimalSaleContainer: (animalSale: AnimalSaleModel) => void
  closeDeleteAnimalSaleContainer: () => void
}

export const AnimalSaleContext = createContext<AnimalSaleValue>(
  {} as AnimalSaleValue
)

type AnimalSaleProviderProps = PropsWithChildren<{
  animalId: number
}>

export function AnimalSaleProvider({
  children,
  animalId,
}: AnimalSaleProviderProps) {
  const params = useParams<{ propertyId: string }>()

  const [filters, setFilters] = useState<AnimalSaleFilters>({})

  const handleChangeFilters = useCallback((newFilters: AnimalSaleFilters) => {
    setFilters((prevState) => ({
      ...prevState,
      ...newFilters,
    }))
  }, [])

  const [isOpenNewAnimalSaleForm, setIsOpenNewAnimalSaleForm] = useState(false)

  const [isOpenEditAnimalSaleForm, setIsOpenEditAnimalSaleForm] =
    useState(false)

  const [isOpenDeleteAnimalSaleContainer, setIsOpenDeleteAnimalSaleContainer] =
    useState(false)

  const [selectedAnimalSale, setSelectedAnimalSale] =
    useState<AnimalSaleModel>()

  const openNewAnimalSaleForm = useCallback(() => {
    setIsOpenNewAnimalSaleForm(true)
  }, [])

  const closeNewAnimalSaleForm = useCallback(() => {
    setIsOpenNewAnimalSaleForm(false)
  }, [])

  const openEditAnimalSaleForm = useCallback((animalSale: AnimalSaleModel) => {
    setSelectedAnimalSale(animalSale)
    setIsOpenEditAnimalSaleForm(true)
  }, [])

  const closeEditAnimalSaleForm = useCallback(() => {
    setSelectedAnimalSale(undefined)
    setIsOpenEditAnimalSaleForm(false)
  }, [])

  const openDeleteAnimalSaleContainer = useCallback(
    (animalSale: AnimalSaleModel) => {
      setSelectedAnimalSale(animalSale)
      setIsOpenDeleteAnimalSaleContainer(true)
    },
    []
  )

  const closeDeleteAnimalSaleContainer = useCallback(() => {
    setSelectedAnimalSale(undefined)
    setIsOpenDeleteAnimalSaleContainer(false)
  }, [])

  const providerValues = useMemo(
    () => ({
      propertyId: Number(params.propertyId),
      animalId,
      filters,
      handleChangeFilters,
      selectedAnimalSale,
      isOpenNewAnimalSaleForm,
      isOpenEditAnimalSaleForm,
      isOpenDeleteAnimalSaleContainer,
      openNewAnimalSaleForm,
      closeNewAnimalSaleForm,
      openEditAnimalSaleForm,
      closeEditAnimalSaleForm,
      openDeleteAnimalSaleContainer,
      closeDeleteAnimalSaleContainer,
    }),
    [
      params.propertyId,
      animalId,
      filters,
      handleChangeFilters,
      selectedAnimalSale,
      isOpenNewAnimalSaleForm,
      isOpenEditAnimalSaleForm,
      isOpenDeleteAnimalSaleContainer,
      openNewAnimalSaleForm,
      closeNewAnimalSaleForm,
      openEditAnimalSaleForm,
      closeEditAnimalSaleForm,
      openDeleteAnimalSaleContainer,
      closeDeleteAnimalSaleContainer,
    ]
  )

  return (
    <AnimalSaleContext.Provider value={providerValues}>
      {children}
    </AnimalSaleContext.Provider>
  )
}
