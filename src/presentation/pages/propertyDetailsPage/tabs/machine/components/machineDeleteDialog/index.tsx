import React, { useCallback } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { MachineDataFactory } from '@/main/factories/useCases/machine'
import { AlertDialog } from '@/presentation/components/ui'

import { useMachineContext } from '../../hooks/useMachineContext'

export const MachineDeleteDialog: React.FC = () => {
  const deleteMachine = MachineDataFactory.makeRemoteDeleteMachine()

  const {
    propertyId,
    selectedMachine,
    isOpenDeleteMachineContainer,
    closeDeleteMachineContainer,
  } = useMachineContext()

  const queryClient = useQueryClient()

  const { mutateAsync: mutateHandleDeleteMachine } = useMutation({
    mutationFn: deleteMachine.execute,
  })

  const handleDeleteMachine = useCallback(async () => {
    if (!selectedMachine) {
      toast.error('Erro ao remover máquina')
      return
    }

    try {
      await mutateHandleDeleteMachine({
        propertyId,
        machineId: selectedMachine.id,
      })

      queryClient.invalidateQueries({
        queryKey: ['machines'],
        exact: false,
      })

      toast.success('Máquina removida com sucesso')
    } catch {
      toast.error('Erro ao remover máquina')
    } finally {
      closeDeleteMachineContainer()
    }
  }, [
    closeDeleteMachineContainer,
    mutateHandleDeleteMachine,
    propertyId,
    queryClient,
    selectedMachine,
  ])

  return (
    <AlertDialog.Root
      open={isOpenDeleteMachineContainer}
      onOpenChange={closeDeleteMachineContainer}
    >
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>{`Deseja remover a máquina ${selectedMachine?.name}`}</AlertDialog.Title>
          <AlertDialog.Description>
            Não será possível desfazer essa ação!
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancelar</AlertDialog.Cancel>
          <AlertDialog.Action onClick={handleDeleteMachine}>
            Remover
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}
