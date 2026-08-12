import type { UserRole } from './users-model'
import type { WithId } from '@/core/domain/types'

export type UserPermissionModel = {
  role: UserRole
  readOnly: boolean
  regionIds: string[]
  cityIds: string[]
}

export type UserListItemModel = WithId<{
  name: string
  username: string
  cityId: string
  active: boolean
  role?: UserRole
  createdAt: string
}>

export type UserDetailModel = WithId<{
  name: string
  username: string
  cpf: string
  phone: string
  cityId: string
  active: boolean
  createdAt: string
  role: UserRole
  readOnly: boolean
  regionIds: string[]
  cityIds: string[]
}>

export type UserListApiResponse = WithId<{
  name: string
  username: string
  cityId: string
  active: boolean
  role?: string
  createdAt: string
}>

export type UserDetailApiResponse = WithId<{
  name: string
  username: string
  cpf: string
  phone: string
  cityId: string
  active: boolean
  createdAt: string
  role: string
  readOnly: boolean
  regionIds: string[]
  cityIds: string[]
}>
