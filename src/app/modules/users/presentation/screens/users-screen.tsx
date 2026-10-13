import { Input, Select } from '@/core/presentation/components/ui'

import { UserDataTable } from '../components/user-data-table/user-data-table'
import { UserDeactivateDialog } from '../components/user-deactivate-dialog/user-deactivate-dialog'
import { UserPermissionsForm } from '../components/user-permissions-form/user-permissions-form'
import { UsersContext, UsersProvider } from '../contexts/users-context'

export function UsersScreen() {
  return (
    <UsersProvider>
      <UsersContext.Consumer>
        {({
          selectedUser,
          isOpenToggleConfirm,
          isOpenPermissionsForm,
          handleChangeFilters,
          filters,
        }) => (
          <section className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl font-bold">Gerenciamento de Usuários</h1>
              <div className="flex gap-2">
                <Input
                  className="w-fit"
                  value={(filters.name?.value as string) ?? ''}
                  onChange={({ target }) =>
                    handleChangeFilters({
                      name: { value: target.value, type: 'LIKE' },
                    })
                  }
                  placeholder="Buscar por nome ou username"
                />
                <Select.Root
                  value={
                    filters.active === undefined
                      ? 'all'
                      : String(filters.active.value)
                  }
                  onValueChange={(value) =>
                    handleChangeFilters({
                      active:
                        value === 'all'
                          ? undefined
                          : { value: value === 'true', type: 'EQUALS' },
                    })
                  }
                >
                  <Select.Trigger className="w-36">
                    <Select.Value />
                  </Select.Trigger>
                  <Select.Content>
                    <Select.Item value="all">Todos</Select.Item>
                    <Select.Item value="true">Ativo</Select.Item>
                    <Select.Item value="false">Inativo</Select.Item>
                  </Select.Content>
                </Select.Root>
              </div>
            </div>

            <UserDataTable />

            {selectedUser && isOpenToggleConfirm && <UserDeactivateDialog />}

            {isOpenPermissionsForm && <UserPermissionsForm />}
          </section>
        )}
      </UsersContext.Consumer>
    </UsersProvider>
  )
}

UsersScreen.displayName = 'UsersScreen'
