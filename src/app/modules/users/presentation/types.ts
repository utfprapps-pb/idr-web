import type { UserListItemModel } from '../domain/models/users-management-model'
import type { Filters, Sort } from '@/core/domain/types'

export type UserFilters = Filters<UserListItemModel>
export type UserSort = Sort<UserListItemModel>
