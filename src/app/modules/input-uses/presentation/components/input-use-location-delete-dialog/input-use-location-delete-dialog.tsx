import { useCallback } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { AlertDialog } from '@/core/presentation/components/ui'

import { makeRemoteDeleteInputUseLocationUseCase } from '../../../main/factories/use-cases/input-use-locations-use-cases'
import { useInputUseLocationContext } from '../../hooks/input-use-location-context.hook'

export function InputUseLocationDeleteDialog() {
  const deleteInputUseLocationUseCase =
    makeRemoteDeleteInputUseLocationUseCase()

  const {
    selectedInputUseLocation,
    isOpenDeleteInputUseLocationContainer,
    closeDeleteInputUseLocationContainer,
  } = useInputUseLocationContext()

  const queryClient = useQueryClient()

  const { mutateAsync: mutateHandleDeleteInputUseLocation } = useMutation({
    mutationFn: deleteInputUseLocationUseCase.execute,
  })

  const handleDeleteInputUseLocation = useCallback(async () => {
    if (!selectedInputUseLocation?.id) {
      toast.error('Erro ao remover local de utilização')
      return
    }

    try {
      await mutateHandleDeleteInputUseLocation({
        id: selectedInputUseLocation.id,
      })

      queryClient.invalidateQueries({
        queryKey: ['input-use-locations'],
        exact: false,
      })

      toast.success('Local de utilização removido com sucesso')
    } catch {
      toast.error('Erro ao remover local de utilização')
    } finally {
      closeDeleteInputUseLocationContainer()
    }
  }, [
    closeDeleteInputUseLocationContainer,
    mutateHandleDeleteInputUseLocation,
    queryClient,
    selectedInputUseLocation,
  ])

  return (
    <AlertDialog.Root
      open={isOpenDeleteInputUseLocationContainer}
      onOpenChange={closeDeleteInputUseLocationContainer}
    >
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>
            {`Deseja remover o local de utilização
            ${selectedInputUseLocation?.description}?`}
          </AlertDialog.Title>
          <AlertDialog.Description>
            Não será possível desfazer essa ação!
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancelar</AlertDialog.Cancel>
          <AlertDialog.Action onClick={handleDeleteInputUseLocation}>
            Remover
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

InputUseLocationDeleteDialog.displayName = 'InputUseLocationDeleteDialog'
