import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'

import { useParams } from 'react-router-dom'

import type { CultivationPestModel } from '../../domain/models/cultivation-pests-model'
import type { CultivationPestFilters } from '../types/cultivation-pest-types'

type CultivationPestValue = {
  propertyId: number
  selectedCultivationPest?: CultivationPestModel
  filters: CultivationPestFilters
  handleChangeFilters: (newFilters: CultivationPestFilters) => void
  isOpenNewCultivationPestForm: boolean
  isOpenEditCultivationPestForm: boolean
  isOpenDeleteCultivationPestContainer: boolean
  openNewCultivationPestForm: () => void
  closeNewCultivationPestForm: () => void
  openEditCultivationPestForm: (cultivationPest: CultivationPestModel) => void
  closeEditCultivationPestForm: () => void
  openDeleteCultivationPestContainer: (
    cultivationPest: CultivationPestModel
  ) => void
  closeDeleteCultivationPestContainer: () => void
}

export const CultivationPestContext = createContext<CultivationPestValue>(
  {} as CultivationPestValue
)

export function CultivationPestProvider({
  children,
}: Readonly<PropsWithChildren>) {
  const params = useParams<{ propertyId: string }>()

  const [filters, setFilters] = useState<CultivationPestFilters>({})

  const handleChangeFilters = useCallback(
    (newFilters: CultivationPestFilters) => {
      setFilters((prevState) => ({
        ...prevState,
        ...newFilters,
      }))
    },
    []
  )

  const [isOpenNewCultivationPestForm, setIsOpenNewCultivationPestForm] =
    useState(false)

  const [isOpenEditCultivationPestForm, setIsOpenEditCultivationPestForm] =
    useState(false)

  const [
    isOpenDeleteCultivationPestContainer,
    setIsOpenDeleteCultivationPestContainer,
  ] = useState(false)

  const [selectedCultivationPest, setSelectedCultivationPest] =
    useState<CultivationPestModel>()

  const openNewCultivationPestForm = useCallback(() => {
    setIsOpenNewCultivationPestForm(true)
  }, [])

  const closeNewCultivationPestForm = useCallback(() => {
    setIsOpenNewCultivationPestForm(false)
  }, [])

  const openEditCultivationPestForm = useCallback(
    (cultivationPest: CultivationPestModel) => {
      setSelectedCultivationPest(cultivationPest)
      setIsOpenEditCultivationPestForm(true)
    },
    []
  )

  const closeEditCultivationPestForm = useCallback(() => {
    setSelectedCultivationPest(undefined)
    setIsOpenEditCultivationPestForm(false)
  }, [])

  const openDeleteCultivationPestContainer = useCallback(
    (cultivationPest: CultivationPestModel) => {
      setSelectedCultivationPest(cultivationPest)
      setIsOpenDeleteCultivationPestContainer(true)
    },
    []
  )

  const closeDeleteCultivationPestContainer = useCallback(() => {
    setSelectedCultivationPest(undefined)
    setIsOpenDeleteCultivationPestContainer(false)
  }, [])

  const providerValues = useMemo(
    () => ({
      propertyId: Number(params.propertyId),
      filters,
      handleChangeFilters,
      selectedCultivationPest,
      isOpenNewCultivationPestForm,
      isOpenEditCultivationPestForm,
      isOpenDeleteCultivationPestContainer,
      openNewCultivationPestForm,
      closeNewCultivationPestForm,
      openEditCultivationPestForm,
      closeEditCultivationPestForm,
      openDeleteCultivationPestContainer,
      closeDeleteCultivationPestContainer,
    }),
    [
      params.propertyId,
      filters,
      handleChangeFilters,
      selectedCultivationPest,
      isOpenNewCultivationPestForm,
      isOpenEditCultivationPestForm,
      isOpenDeleteCultivationPestContainer,
      openNewCultivationPestForm,
      closeNewCultivationPestForm,
      openEditCultivationPestForm,
      closeEditCultivationPestForm,
      openDeleteCultivationPestContainer,
      closeDeleteCultivationPestContainer,
    ]
  )

  return (
    <CultivationPestContext.Provider value={providerValues}>
      {children}
    </CultivationPestContext.Provider>
  )
}
