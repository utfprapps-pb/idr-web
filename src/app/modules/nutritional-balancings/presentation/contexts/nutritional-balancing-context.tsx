import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'

import { useParams } from 'react-router-dom'

import type { NutritionalBalancingModel } from '../../domain/models/nutritional-balancings-model'
import type { NutritionalBalancingFilters } from '../types/nutritional-balancing-types'

type NutritionalBalancingContextValue = {
  propertyId: number
  filters: NutritionalBalancingFilters
  handleChangeFilters: (newFilters: NutritionalBalancingFilters) => void
  selectedNutritionalBalancing?: NutritionalBalancingModel
  isOpenNewNutritionalBalancingScreen: boolean
  isOpenEditNutritionalBalancingScreen: boolean
  isOpenDeleteNutritionalBalancingContainer: boolean
  openNewNutritionalBalancingScreen: () => void
  closeNewNutritionalBalancingScreen: () => void
  openEditNutritionalBalancingScreen: (
    nutritionalBalancing: NutritionalBalancingModel
  ) => void
  closeEditNutritionalBalancingScreen: () => void
  openDeleteNutritionalBalancingContainer: (
    nutritionalBalancing: NutritionalBalancingModel
  ) => void
  closeDeleteNutritionalBalancingContainer: () => void
}

export const NutritionalBalancingContext =
  createContext<NutritionalBalancingContextValue>(
    {} as NutritionalBalancingContextValue
  )

export function NutritionalBalancingProvider({
  children,
}: Readonly<PropsWithChildren>) {
  const params = useParams<{ propertyId: string }>()

  const [filters, setFilters] = useState<NutritionalBalancingFilters>({})

  const handleChangeFilters = useCallback(
    (newFilters: NutritionalBalancingFilters) => {
      setFilters((prevState) => ({
        ...prevState,
        ...newFilters,
      }))
    },
    []
  )

  const [
    isOpenNewNutritionalBalancingScreen,
    setIsOpenNewNutritionalBalancingScreen,
  ] = useState(false)

  const [
    isOpenEditNutritionalBalancingScreen,
    setIsOpenEditNutritionalBalancingScreen,
  ] = useState(false)

  const [
    isOpenDeleteNutritionalBalancingContainer,
    setIsOpenDeleteNutritionalBalancingContainer,
  ] = useState(false)

  const [selectedNutritionalBalancing, setSelectedNutritionalBalancing] =
    useState<NutritionalBalancingModel>()

  const openNewNutritionalBalancingScreen = useCallback(() => {
    setIsOpenNewNutritionalBalancingScreen(true)
  }, [])

  const closeNewNutritionalBalancingScreen = useCallback(() => {
    setIsOpenNewNutritionalBalancingScreen(false)
  }, [])

  const openEditNutritionalBalancingScreen = useCallback(
    (nutritionalBalancing: NutritionalBalancingModel) => {
      setSelectedNutritionalBalancing(nutritionalBalancing)
      setIsOpenEditNutritionalBalancingScreen(true)
    },
    []
  )

  const closeEditNutritionalBalancingScreen = useCallback(() => {
    setSelectedNutritionalBalancing(undefined)
    setIsOpenEditNutritionalBalancingScreen(false)
  }, [])

  const openDeleteNutritionalBalancingContainer = useCallback(
    (nutritionalBalancing: NutritionalBalancingModel) => {
      setSelectedNutritionalBalancing(nutritionalBalancing)
      setIsOpenDeleteNutritionalBalancingContainer(true)
    },
    []
  )

  const closeDeleteNutritionalBalancingContainer = useCallback(() => {
    setSelectedNutritionalBalancing(undefined)
    setIsOpenDeleteNutritionalBalancingContainer(false)
  }, [])

  const providerValues = useMemo(
    () => ({
      propertyId: Number(params.propertyId),
      filters,
      handleChangeFilters,
      selectedNutritionalBalancing,
      isOpenNewNutritionalBalancingScreen,
      isOpenEditNutritionalBalancingScreen,
      isOpenDeleteNutritionalBalancingContainer,
      openNewNutritionalBalancingScreen,
      closeNewNutritionalBalancingScreen,
      openEditNutritionalBalancingScreen,
      closeEditNutritionalBalancingScreen,
      openDeleteNutritionalBalancingContainer,
      closeDeleteNutritionalBalancingContainer,
    }),
    [
      params.propertyId,
      filters,
      handleChangeFilters,
      selectedNutritionalBalancing,
      isOpenNewNutritionalBalancingScreen,
      isOpenEditNutritionalBalancingScreen,
      isOpenDeleteNutritionalBalancingContainer,
      openNewNutritionalBalancingScreen,
      closeNewNutritionalBalancingScreen,
      openEditNutritionalBalancingScreen,
      closeEditNutritionalBalancingScreen,
      openDeleteNutritionalBalancingContainer,
      closeDeleteNutritionalBalancingContainer,
    ]
  )

  if (!params.propertyId) {
    return null
  }

  return (
    <NutritionalBalancingContext.Provider value={providerValues}>
      {children}
    </NutritionalBalancingContext.Provider>
  )
}

NutritionalBalancingProvider.displayName = 'NutritionalBalancingProvider'
