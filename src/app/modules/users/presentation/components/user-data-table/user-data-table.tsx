import { DataTable } from '@/core/presentation/components/ui'

import { useUserDataTable } from './user-data-table.hook'

import type { UserListItemModel } from '../../../domain/models/users-management-model'

export function UserDataTable() {
  const { columns, users, isLoading, page, sort, setPage, setSort } =
    useUserDataTable()

  return (
    <DataTable<UserListItemModel>
      columns={columns}
      data={users.resources}
      totalPages={users.totalPages}
      pagination={{
        currentPage: page,
        onPageChange: setPage,
      }}
      sorting={{
        currentSorting: sort,
        onSorting: setSort,
      }}
      loading={isLoading}
    />
  )
}

UserDataTable.displayName = 'UserDataTable'
