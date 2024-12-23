import React, { useCallback } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { PerennialForageDataFactory } from '@/main/factories/useCases/perennialForage'
import { AlertDialog } from '@/presentation/components/ui'

import { usePerennialForageContext } from '../../hooks/usePerennialForageContext'

export const PerennialForageDeleteDialog: React.FC = () => {
  const deletePerennialForage = PerennialForageDataFactory.makeRemoteDelete()

  const {
    propertyId,
    selectedPerennialForage,
    isOpenDeletePerennialForageContainer,
    closeDeletePerennialForageContainer,
  } = usePerennialForageContext()

  const queryClient = useQueryClient()

  const { mutateAsync: mutateHandleDeletePerennialForage } = useMutation({
    mutationFn: deletePerennialForage.execute,
  })

  const handleDeletePerennialForage = useCallback(async () => {
    if (!selectedPerennialForage) {
      toast.error('Erro ao remover forrageira perene')
      return
    }

    try {
      await mutateHandleDeletePerennialForage({
        propertyId,
        perennialForageId: selectedPerennialForage.id,
      })

      queryClient.invalidateQueries({
        queryKey: ['perennialForages'],
        exact: false,
      })

      toast.success('Forrageira perene removida com sucesso')
    } catch {
      toast.error('Erro ao remover forrageira perene')
    } finally {
      closeDeletePerennialForageContainer()
    }
  }, [
    closeDeletePerennialForageContainer,
    mutateHandleDeletePerennialForage,
    propertyId,
    queryClient,
    selectedPerennialForage,
  ])

  return (
    <AlertDialog.Root
      open={isOpenDeletePerennialForageContainer}
      onOpenChange={closeDeletePerennialForageContainer}
    >
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>{`Deseja remover a forrageira de ${selectedPerennialForage!.cultivation}`}</AlertDialog.Title>
          <AlertDialog.Description>
            Não será possível desfazer essa ação!
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancelar</AlertDialog.Cancel>
          <AlertDialog.Action onClick={handleDeletePerennialForage}>
            Remover
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}
