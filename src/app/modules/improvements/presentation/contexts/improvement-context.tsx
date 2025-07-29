import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'

import { useParams } from 'react-router-dom'

import type { ImprovementModel } from '../../domain/models/improvements-model'
import type { ImprovementFilters } from '../types'

type ImprovementContextValue = {
  propertyId: string
  filters: ImprovementFilters
  handleChangeFilters: (newFilters: ImprovementFilters) => void
  selectedImprovement?: ImprovementModel
  isOpenNewImprovementForm: boolean
  isOpenEditImprovementForm: boolean
  isOpenDeleteImprovementContainer: boolean
  openNewImprovementForm: () => void
  closeNewImprovementForm: () => void
  openEditImprovementForm: (improvement: ImprovementModel) => void
  closeEditImprovementForm: () => void
  openDeleteImprovementContainer: (improvement: ImprovementModel) => void
  closeDeleteImprovementContainer: () => void
}

export const ImprovementContext = createContext({} as ImprovementContextValue)

export function ImprovementProvider({ children }: PropsWithChildren) {
  const params = useParams<{ propertyId: string }>()

  const [filters, setFilters] = useState<ImprovementFilters>({
    description: '',
  })

  const handleChangeFilters = useCallback((newFilters: ImprovementFilters) => {
    setFilters((prevState) => ({
      ...prevState,
      ...newFilters,
    }))
  }, [])

  const [isOpenNewImprovementForm, setIsOpenNewImprovementForm] =
    useState(false)

  const [isOpenEditImprovementForm, setIsOpenEditImprovementForm] =
    useState(false)

  const [
    isOpenDeleteImprovementContainer,
    setIsOpenDeleteImprovementContainer,
  ] = useState(false)

  const [selectedImprovement, setSelectedImprovement] =
    useState<ImprovementModel>()

  const openNewImprovementForm = useCallback(() => {
    setIsOpenNewImprovementForm(true)
  }, [])

  const closeNewImprovementForm = useCallback(() => {
    setIsOpenNewImprovementForm(false)
  }, [])

  const openEditImprovementForm = useCallback(
    (improvement: ImprovementModel) => {
      setSelectedImprovement(improvement)
      setIsOpenEditImprovementForm(true)
    },
    []
  )

  const closeEditImprovementForm = useCallback(() => {
    setSelectedImprovement(undefined)
    setIsOpenEditImprovementForm(false)
  }, [])

  const openDeleteImprovementContainer = useCallback(
    (improvement: ImprovementModel) => {
      setSelectedImprovement(improvement)
      setIsOpenDeleteImprovementContainer(true)
    },
    []
  )

  const closeDeleteImprovementContainer = useCallback(() => {
    setSelectedImprovement(undefined)
    setIsOpenDeleteImprovementContainer(false)
  }, [])

  const providerValues = useMemo(
    () => ({
      propertyId: params.propertyId as string, // Typecast allowed to avoid undefined, as it has validation below
      filters,
      handleChangeFilters,
      selectedImprovement,
      isOpenNewImprovementForm,
      isOpenEditImprovementForm,
      isOpenDeleteImprovementContainer,
      openNewImprovementForm,
      closeNewImprovementForm,
      openEditImprovementForm,
      closeEditImprovementForm,
      openDeleteImprovementContainer,
      closeDeleteImprovementContainer,
    }),
    [
      params.propertyId,
      filters,
      handleChangeFilters,
      selectedImprovement,
      isOpenNewImprovementForm,
      isOpenEditImprovementForm,
      isOpenDeleteImprovementContainer,
      openNewImprovementForm,
      closeNewImprovementForm,
      openEditImprovementForm,
      closeEditImprovementForm,
      openDeleteImprovementContainer,
      closeDeleteImprovementContainer,
    ]
  )

  if (!params.propertyId) {
    return null
  }

  return (
    <ImprovementContext.Provider value={providerValues}>
      {children}
    </ImprovementContext.Provider>
  )
}

ImprovementProvider.displayName = 'ImprovementProvider'
