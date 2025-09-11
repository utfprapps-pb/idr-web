import { useCallback } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { AlertDialog } from '@/core/presentation/components/ui'

import { makeRemoteDeleteForageUseCase } from '../../../main/factories/use-cases'
import { useForageContext } from '../../hooks/forage-context.hook'

export function ForageDeleteDialog() {
  const deleteForageUseCase = makeRemoteDeleteForageUseCase()

  const {
    propertyId,
    selectedForage,
    isOpenDeleteForageContainer,
    closeDeleteForageContainer,
  } = useForageContext()

  const queryClient = useQueryClient()

  const { mutateAsync: mutateHandleDeleteForage } = useMutation({
    mutationFn: deleteForageUseCase.execute,
  })

  const handleDeleteForage = useCallback(async () => {
    if (!selectedForage) {
      toast.error('Erro ao remover forrageira')
      return
    }

    try {
      await mutateHandleDeleteForage({
        propertyId,
        forageId: selectedForage.id,
      })

      queryClient.invalidateQueries({
        queryKey: ['forages'],
        exact: false,
      })

      toast.success('Forrageira removida com sucesso')
    } catch {
      toast.error('Erro ao remover forrageira')
    } finally {
      closeDeleteForageContainer()
    }
  }, [
    closeDeleteForageContainer,
    mutateHandleDeleteForage,
    propertyId,
    queryClient,
    selectedForage,
  ])

  return (
    <AlertDialog.Root
      open={isOpenDeleteForageContainer}
      onOpenChange={closeDeleteForageContainer}
    >
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>
            {`Deseja remover a forrageira de ${selectedForage!.cultivation}`}
          </AlertDialog.Title>
          <AlertDialog.Description>
            Não será possível desfazer essa ação!
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancelar</AlertDialog.Cancel>
          <AlertDialog.Action onClick={handleDeleteForage}>
            Remover
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

ForageDeleteDialog.displayName = 'ForageDeleteDialog'
