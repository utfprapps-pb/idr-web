import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react'

import type { UserListItemModel } from '../../domain/models/users-management-model'
import type { UserFilters } from '../types'

type UsersContextValue = {
  filters: UserFilters
  handleChangeFilters: (newFilters: UserFilters) => void
  selectedUser?: UserListItemModel
  isOpenPermissionsForm: boolean
  openPermissionsForm: (user: UserListItemModel) => void
  closePermissionsForm: () => void
  isOpenToggleConfirm: boolean
  openToggleConfirm: (user: UserListItemModel) => void
  closeToggleConfirm: () => void
}

export const UsersContext = createContext({} as UsersContextValue)

export function UsersProvider({ children }: Readonly<PropsWithChildren>) {
  const [filters, setFilters] = useState<UserFilters>({})
  const [selectedUser, setSelectedUser] = useState<UserListItemModel>()
  const [isOpenPermissionsForm, setIsOpenPermissionsForm] = useState(false)
  const [isOpenToggleConfirm, setIsOpenToggleConfirm] = useState(false)

  const handleChangeFilters = useCallback((newFilters: UserFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }, [])

  const openPermissionsForm = useCallback((user: UserListItemModel) => {
    setSelectedUser(user)
    setIsOpenPermissionsForm(true)
  }, [])

  const closePermissionsForm = useCallback(() => {
    setSelectedUser(undefined)
    setIsOpenPermissionsForm(false)
  }, [])

  const openToggleConfirm = useCallback((user: UserListItemModel) => {
    setSelectedUser(user)
    setIsOpenToggleConfirm(true)
  }, [])

  const closeToggleConfirm = useCallback(() => {
    setSelectedUser(undefined)
    setIsOpenToggleConfirm(false)
  }, [])

  const providerValues = useMemo(
    () => ({
      filters,
      handleChangeFilters,
      selectedUser,
      isOpenPermissionsForm,
      openPermissionsForm,
      closePermissionsForm,
      isOpenToggleConfirm,
      openToggleConfirm,
      closeToggleConfirm,
    }),
    [
      filters,
      handleChangeFilters,
      selectedUser,
      isOpenPermissionsForm,
      openPermissionsForm,
      closePermissionsForm,
      isOpenToggleConfirm,
      openToggleConfirm,
      closeToggleConfirm,
    ]
  )

  return (
    <UsersContext.Provider value={providerValues}>
      {children}
    </UsersContext.Provider>
  )
}

UsersProvider.displayName = 'UsersProvider'
