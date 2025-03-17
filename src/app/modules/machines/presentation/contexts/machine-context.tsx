import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'

import { useParams } from 'react-router-dom'

import type { MachineModel } from '../../domain/models/machines-model'
import type { MachineFilters } from '../types'

type MachineContextValue = {
  propertyId: string
  filters: MachineFilters
  handleChangeFilters: (newFilters: MachineFilters) => void
  selectedMachine?: MachineModel
  isOpenNewMachineForm: boolean
  isOpenEditMachineForm: boolean
  isOpenDeleteMachineContainer: boolean
  openNewMachineForm: () => void
  closeNewMachineForm: () => void
  openEditMachineForm: (machine: MachineModel) => void
  closeEditMachineForm: () => void
  openDeleteMachineContainer: (machine: MachineModel) => void
  closeDeleteMachineContainer: () => void
}

export const MachineContext = createContext({} as MachineContextValue)

export function MachineProvider({ children }: PropsWithChildren) {
  const params = useParams<{ id: string }>()

  const [filters, setFilters] = useState<MachineFilters>({
    name: '',
  })

  const handleChangeFilters = useCallback((newFilters: MachineFilters) => {
    setFilters((prevState) => ({
      ...prevState,
      ...newFilters,
    }))
  }, [])

  const [isOpenNewMachineForm, setIsOpenNewMachineForm] = useState(false)

  const [isOpenEditMachineForm, setIsOpenEditMachineForm] = useState(false)

  const [isOpenDeleteMachineContainer, setIsOpenDeleteMachineContainer] =
    useState(false)

  const [selectedMachine, setSelectedMachine] = useState<MachineModel>()

  const openNewMachineForm = useCallback(() => {
    setIsOpenNewMachineForm(true)
  }, [])

  const closeNewMachineForm = useCallback(() => {
    setIsOpenNewMachineForm(false)
  }, [])

  const openEditMachineForm = useCallback((machine: MachineModel) => {
    setSelectedMachine(machine)
    setIsOpenEditMachineForm(true)
  }, [])

  const closeEditMachineForm = useCallback(() => {
    setSelectedMachine(undefined)
    setIsOpenEditMachineForm(false)
  }, [])

  const openDeleteMachineContainer = useCallback((machine: MachineModel) => {
    setSelectedMachine(machine)
    setIsOpenDeleteMachineContainer(true)
  }, [])

  const closeDeleteMachineContainer = useCallback(() => {
    setSelectedMachine(undefined)
    setIsOpenDeleteMachineContainer(false)
  }, [])

  const providerValues = useMemo(
    () => ({
      propertyId: params.id as string, // Typecast allowed to avoid undefined, as it has validation below
      filters,
      handleChangeFilters,
      selectedMachine,
      isOpenNewMachineForm,
      isOpenEditMachineForm,
      isOpenDeleteMachineContainer,
      openNewMachineForm,
      closeNewMachineForm,
      openEditMachineForm,
      closeEditMachineForm,
      openDeleteMachineContainer,
      closeDeleteMachineContainer,
    }),
    [
      params.id,
      filters,
      handleChangeFilters,
      selectedMachine,
      isOpenNewMachineForm,
      isOpenEditMachineForm,
      isOpenDeleteMachineContainer,
      openNewMachineForm,
      closeNewMachineForm,
      openEditMachineForm,
      closeEditMachineForm,
      openDeleteMachineContainer,
      closeDeleteMachineContainer,
    ]
  )

  if (!params.id) {
    return null
  }

  return (
    <MachineContext.Provider value={providerValues}>
      {children}
    </MachineContext.Provider>
  )
}
