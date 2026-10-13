import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'

import type { RegionModel } from '../../domain/models/regions-model'

type RegionContextValue = {
  regionSelected: null | RegionModel
  isOpenNewRegionForm: boolean
  isOpenEditRegionForm: boolean
  isOpenDeleteRegionContainer: boolean
  openNewRegionForm: () => void
  closeNewRegionForm: () => void
  openEditRegionForm: (region: RegionModel) => void
  closeEditRegionForm: () => void
  openDeleteRegionContainer: (region: RegionModel) => void
  closeDeleteRegionContainer: () => void
}

export const RegionContext = createContext({} as RegionContextValue)

export function RegionProvider({ children }: Readonly<PropsWithChildren>) {
  const [isOpenNewRegionForm, setIsOpenNewRegionForm] = useState(false)
  const [isOpenEditRegionForm, setIsOpenEditRegionForm] = useState(false)
  const [isOpenDeleteRegionContainer, setIsOpenDeleteRegionContainer] =
    useState(false)
  const [regionSelected, setRegionSelected] = useState<null | RegionModel>(null)

  const openNewRegionForm = useCallback(() => {
    setIsOpenNewRegionForm(true)
  }, [])

  const closeNewRegionForm = useCallback(() => {
    setIsOpenNewRegionForm(false)
  }, [])

  const openEditRegionForm = useCallback((region: RegionModel) => {
    setRegionSelected(region)
    setIsOpenEditRegionForm(true)
  }, [])

  const closeEditRegionForm = useCallback(() => {
    setRegionSelected(null)
    setIsOpenEditRegionForm(false)
  }, [])

  const openDeleteRegionContainer = useCallback((region: RegionModel) => {
    setRegionSelected(region)
    setIsOpenDeleteRegionContainer(true)
  }, [])

  const closeDeleteRegionContainer = useCallback(() => {
    setRegionSelected(null)
    setIsOpenDeleteRegionContainer(false)
  }, [])

  const providerValues = useMemo(
    () => ({
      regionSelected,
      isOpenNewRegionForm,
      isOpenEditRegionForm,
      isOpenDeleteRegionContainer,
      openNewRegionForm,
      closeNewRegionForm,
      openEditRegionForm,
      closeEditRegionForm,
      openDeleteRegionContainer,
      closeDeleteRegionContainer,
    }),
    [
      regionSelected,
      isOpenNewRegionForm,
      isOpenEditRegionForm,
      isOpenDeleteRegionContainer,
      openNewRegionForm,
      closeNewRegionForm,
      openEditRegionForm,
      closeEditRegionForm,
      openDeleteRegionContainer,
      closeDeleteRegionContainer,
    ]
  )

  return (
    <RegionContext.Provider value={providerValues}>
      {children}
    </RegionContext.Provider>
  )
}

RegionProvider.displayName = 'RegionProvider'
