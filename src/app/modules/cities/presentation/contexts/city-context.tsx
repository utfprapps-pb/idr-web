import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'

import type { CityModel } from '../../domain/models/cities-model'

type CityContextValue = {
  citySelected: null | CityModel
  isOpenNewCityForm: boolean
  isOpenEditCityForm: boolean
  isOpenDeleteCityContainer: boolean
  openNewCityForm: () => void
  closeNewCityForm: () => void
  openEditCityForm: (city: CityModel) => void
  closeEditCityForm: () => void
  openDeleteCityContainer: (city: CityModel) => void
  closeDeleteCityContainer: () => void
}

export const CityContext = createContext({} as CityContextValue)

export function CityProvider({ children }: Readonly<PropsWithChildren>) {
  const [isOpenNewCityForm, setIsOpenNewCityForm] = useState(false)
  const [isOpenEditCityForm, setIsOpenEditCityForm] = useState(false)
  const [isOpenDeleteCityContainer, setIsOpenDeleteCityContainer] =
    useState(false)
  const [citySelected, setCitySelected] = useState<null | CityModel>(null)

  const openNewCityForm = useCallback(() => {
    setIsOpenNewCityForm(true)
  }, [])

  const closeNewCityForm = useCallback(() => {
    setIsOpenNewCityForm(false)
  }, [])

  const openEditCityForm = useCallback((city: CityModel) => {
    setCitySelected(city)
    setIsOpenEditCityForm(true)
  }, [])

  const closeEditCityForm = useCallback(() => {
    setCitySelected(null)
    setIsOpenEditCityForm(false)
  }, [])

  const openDeleteCityContainer = useCallback((city: CityModel) => {
    setCitySelected(city)
    setIsOpenDeleteCityContainer(true)
  }, [])

  const closeDeleteCityContainer = useCallback(() => {
    setCitySelected(null)
    setIsOpenDeleteCityContainer(false)
  }, [])

  const providerValues = useMemo(
    () => ({
      citySelected,
      isOpenNewCityForm,
      isOpenEditCityForm,
      isOpenDeleteCityContainer,
      openNewCityForm,
      closeNewCityForm,
      openEditCityForm,
      closeEditCityForm,
      openDeleteCityContainer,
      closeDeleteCityContainer,
    }),
    [
      citySelected,
      isOpenNewCityForm,
      isOpenEditCityForm,
      isOpenDeleteCityContainer,
      openNewCityForm,
      closeNewCityForm,
      openEditCityForm,
      closeEditCityForm,
      openDeleteCityContainer,
      closeDeleteCityContainer,
    ]
  )

  return (
    <CityContext.Provider value={providerValues}>
      {children}
    </CityContext.Provider>
  )
}

CityProvider.displayName = 'CityProvider'
