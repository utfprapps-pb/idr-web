import { useCallback } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { AlertDialog } from '@/core/presentation/components/ui'

import { makeRemoteToggleUserActiveUseCase } from '../../../main/factories/use-cases'
import { useUsersContext } from '../../hooks/users-context.hook'

export function UserDeactivateDialog() {
  const { selectedUser, isOpenToggleConfirm, closeToggleConfirm } =
    useUsersContext()

  const toggleUseCase = makeRemoteToggleUserActiveUseCase()
  const queryClient = useQueryClient()

  const { mutateAsync: mutateToggle } = useMutation({
    mutationFn: toggleUseCase.execute,
  })

  const handleDeactivate = useCallback(async () => {
    if (!selectedUser) return
    try {
      await mutateToggle({ userId: String(selectedUser.id) })
      queryClient.invalidateQueries({
        queryKey: ['admin', 'users'],
        exact: false,
      })
      toast.success('Usuário desativado com sucesso')
    } catch {
      toast.error('Erro ao desativar usuário')
    } finally {
      closeToggleConfirm()
    }
  }, [closeToggleConfirm, mutateToggle, queryClient, selectedUser])

  return (
    <AlertDialog.Root
      open={isOpenToggleConfirm}
      onOpenChange={closeToggleConfirm}
    >
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>
            {`Desativar ${selectedUser?.name ?? 'usuário'}?`}
          </AlertDialog.Title>
          <AlertDialog.Description>
            O usuário perderá acesso ao sistema enquanto estiver inativo.
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancelar</AlertDialog.Cancel>
          <AlertDialog.Action onClick={handleDeactivate}>
            Desativar
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

UserDeactivateDialog.displayName = 'UserDeactivateDialog'
