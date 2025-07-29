import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'

import type { PropertyModel } from '../../domain/models/properties-model'

type PropertyContextValue = {
  propertySelected: null | PropertyModel
  isOpenNewPropertyForm: boolean
  isOpenEditPropertyForm: boolean
  isOpenDeletePropertyContainer: boolean
  openNewPropertyForm: () => void
  closeNewPropertyForm: () => void
  openEditPropertyForm: (property: PropertyModel) => void
  closeEditPropertyForm: () => void
  openDeletePropertyContainer: (property: PropertyModel) => void
  closeDeletePropertyContainer: () => void
}

export const PropertyContext = createContext({} as PropertyContextValue)

export function PropertyProvider({ children }: PropsWithChildren) {
  const [isOpenNewPropertyForm, setIsOpenNewPropertyForm] = useState(false)

  const [isOpenEditPropertyForm, setIsOpenEditPropertyForm] = useState(false)

  const [isOpenDeletePropertyContainer, setIsOpenDeletePropertyContainer] =
    useState(false)

  const [propertySelected, setPropertySelected] =
    useState<null | PropertyModel>(null)

  const openNewPropertyForm = useCallback(() => {
    setIsOpenNewPropertyForm(true)
  }, [])

  const closeNewPropertyForm = useCallback(() => {
    setIsOpenNewPropertyForm(false)
  }, [])

  const openEditPropertyForm = useCallback((property: PropertyModel) => {
    setPropertySelected(property)
    setIsOpenEditPropertyForm(true)
  }, [])

  const closeEditPropertyForm = useCallback(() => {
    setPropertySelected(null)
    setIsOpenEditPropertyForm(false)
  }, [])

  const openDeletePropertyContainer = useCallback((property: PropertyModel) => {
    setPropertySelected(property)
    setIsOpenDeletePropertyContainer(true)
  }, [])

  const closeDeletePropertyContainer = useCallback(() => {
    setPropertySelected(null)
    setIsOpenDeletePropertyContainer(false)
  }, [])

  const providerValues = useMemo(
    () => ({
      propertySelected,
      isOpenNewPropertyForm,
      isOpenEditPropertyForm,
      isOpenDeletePropertyContainer,
      openNewPropertyForm,
      closeNewPropertyForm,
      openEditPropertyForm,
      closeEditPropertyForm,
      openDeletePropertyContainer,
      closeDeletePropertyContainer,
    }),
    [
      propertySelected,
      isOpenNewPropertyForm,
      isOpenEditPropertyForm,
      isOpenDeletePropertyContainer,
      openNewPropertyForm,
      closeNewPropertyForm,
      openEditPropertyForm,
      closeEditPropertyForm,
      openDeletePropertyContainer,
      closeDeletePropertyContainer,
    ]
  )

  return (
    <PropertyContext.Provider value={providerValues}>
      {children}
    </PropertyContext.Provider>
  )
}

PropertyProvider.displayName = 'PropertyProvider'
