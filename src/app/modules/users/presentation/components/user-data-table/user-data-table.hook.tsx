import { useCallback, useMemo, useState } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PencilIcon } from 'lucide-react'
import toast from 'react-hot-toast'

import { Button } from '@/core/presentation/components/ui'
import { useDebounce } from '@/core/presentation/hooks'

import { makeRemoteToggleUserActiveUseCase } from '../../../main/factories/use-cases'
import { useUsersQuery } from '../../hooks/queries/users-query.hook'
import { useUsersContext } from '../../hooks/users-context.hook'

import type { UserListItemModel } from '../../../domain/models/users-management-model'
import type { UserRole } from '@/core/domain/models/users-model'
import type { ColumnDef } from '@tanstack/react-table'

const ROLE_LABELS: Record<UserRole, string> = {
  ADMIN: 'Administrador',
  COORDENACAO_GERAL: 'Coordenação Geral',
  GERENCIA_MACRO: 'Gerência Macro',
  GERENCIA_REGIONAL: 'Gerência Regional',
  GERENCIA_MUNICIPAL: 'Gerência Municipal',
  TECNICO: 'Técnico',
}

export function useUserDataTable() {
  const { filters, openPermissionsForm, openToggleConfirm } = useUsersContext()
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<
    { field: keyof UserListItemModel; direction: 'asc' | 'desc' } | undefined
  >()

  const debouncedTerms = useDebounce({
    value: (filters.name?.value as string) ?? '',
  })

  const activeFilter = filters.active?.value as boolean | undefined

  const { isLoading, users } = useUsersQuery({
    page,
    terms: debouncedTerms,
    active: activeFilter,
  })

  const queryClient = useQueryClient()
  const toggleUseCase = makeRemoteToggleUserActiveUseCase()

  const { mutateAsync: mutateToggleActive } = useMutation({
    mutationFn: toggleUseCase.execute,
  })

  const handleToggleActive = useCallback(
    async (user: UserListItemModel) => {
      if (user.active) {
        openToggleConfirm(user)
        return
      }
      try {
        await mutateToggleActive({ userId: String(user.id) })
        queryClient.invalidateQueries({
          queryKey: ['admin', 'users'],
          exact: false,
        })
        toast.success('Usuário ativado com sucesso')
      } catch {
        toast.error('Erro ao ativar usuário')
      }
    },
    [mutateToggleActive, openToggleConfirm, queryClient]
  )

  const columns = useMemo<ColumnDef<UserListItemModel>[]>(
    () => [
      {
        accessorKey: 'name',
        header: 'Nome',
      },
      {
        accessorKey: 'username',
        header: 'Username',
      },
      {
        accessorKey: 'role',
        header: 'Perfil',
        cell: ({ row }) => {
          const { role } = row.original
          return role ? ROLE_LABELS[role] : '—'
        },
      },
      {
        accessorKey: 'active',
        header: 'Status',
        cell: ({ row }) => {
          const user = row.original
          return (
            <Button
              type="button"
              variant={user.active ? 'default' : 'destructive'}
              size="sm"
              onClick={() => handleToggleActive(user)}
            >
              {user.active ? 'Ativo' : 'Inativo'}
            </Button>
          )
        },
      },
      {
        id: 'row-actions',
        header: '',
        cell: ({ row }) => (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => openPermissionsForm(row.original)}
          >
            <PencilIcon className="size-4" />
          </Button>
        ),
      },
    ],
    [handleToggleActive, openPermissionsForm]
  )

  return {
    columns,
    users,
    isLoading,
    page,
    sort,
    setPage,
    setSort,
  }
}
