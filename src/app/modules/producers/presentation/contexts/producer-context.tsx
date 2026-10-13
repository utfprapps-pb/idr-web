import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'

import type { ProducerModel } from '../../domain/models/producers-model'

type ProducerContextValue = {
  producerSelected: null | ProducerModel
  isOpenNewProducerForm: boolean
  isOpenEditProducerForm: boolean
  isOpenDeleteProducerContainer: boolean
  openNewProducerForm: () => void
  closeNewProducerForm: () => void
  openEditProducerForm: (producer: ProducerModel) => void
  closeEditProducerForm: () => void
  openDeleteProducerContainer: (producer: ProducerModel) => void
  closeDeleteProducerContainer: () => void
}

export const ProducerContext = createContext({} as ProducerContextValue)

export function ProducerProvider({ children }: Readonly<PropsWithChildren>) {
  const [isOpenNewProducerForm, setIsOpenNewProducerForm] = useState(false)
  const [isOpenEditProducerForm, setIsOpenEditProducerForm] = useState(false)
  const [isOpenDeleteProducerContainer, setIsOpenDeleteProducerContainer] =
    useState(false)
  const [producerSelected, setProducerSelected] =
    useState<null | ProducerModel>(null)

  const openNewProducerForm = useCallback(() => {
    setIsOpenNewProducerForm(true)
  }, [])

  const closeNewProducerForm = useCallback(() => {
    setIsOpenNewProducerForm(false)
  }, [])

  const openEditProducerForm = useCallback((producer: ProducerModel) => {
    setProducerSelected(producer)
    setIsOpenEditProducerForm(true)
  }, [])

  const closeEditProducerForm = useCallback(() => {
    setProducerSelected(null)
    setIsOpenEditProducerForm(false)
  }, [])

  const openDeleteProducerContainer = useCallback((producer: ProducerModel) => {
    setProducerSelected(producer)
    setIsOpenDeleteProducerContainer(true)
  }, [])

  const closeDeleteProducerContainer = useCallback(() => {
    setProducerSelected(null)
    setIsOpenDeleteProducerContainer(false)
  }, [])

  const providerValues = useMemo(
    () => ({
      producerSelected,
      isOpenNewProducerForm,
      isOpenEditProducerForm,
      isOpenDeleteProducerContainer,
      openNewProducerForm,
      closeNewProducerForm,
      openEditProducerForm,
      closeEditProducerForm,
      openDeleteProducerContainer,
      closeDeleteProducerContainer,
    }),
    [
      producerSelected,
      isOpenNewProducerForm,
      isOpenEditProducerForm,
      isOpenDeleteProducerContainer,
      openNewProducerForm,
      closeNewProducerForm,
      openEditProducerForm,
      closeEditProducerForm,
      openDeleteProducerContainer,
      closeDeleteProducerContainer,
    ]
  )

  return (
    <ProducerContext.Provider value={providerValues}>
      {children}
    </ProducerContext.Provider>
  )
}

ProducerProvider.displayName = 'ProducerProvider'
