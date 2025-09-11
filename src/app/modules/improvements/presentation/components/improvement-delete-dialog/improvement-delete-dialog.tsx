import { useCallback } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { AlertDialog } from '@/core/presentation/components/ui'

import { makeRemoteDeleteImprovementUseCase } from '../../../main/factories/use-cases'
import { useImprovementContext } from '../../hooks/improvement-context.hook'

export function ImprovementDeleteDialog() {
  const deleteImprovementUseCase = makeRemoteDeleteImprovementUseCase()

  const {
    propertyId,
    selectedImprovement,
    isOpenDeleteImprovementContainer,
    closeDeleteImprovementContainer,
  } = useImprovementContext()

  const queryClient = useQueryClient()

  const { mutateAsync: mutateHandleDeleteImprovement } = useMutation({
    mutationFn: deleteImprovementUseCase.execute,
  })

  const handleDeleteImprovement = useCallback(async () => {
    if (!selectedImprovement) {
      toast.error('Erro ao remover benfeitoria')
      return
    }

    try {
      await mutateHandleDeleteImprovement({
        propertyId,
        improvementId: selectedImprovement.id,
      })

      queryClient.invalidateQueries({
        queryKey: ['improvements'],
        exact: false,
      })

      toast.success('Benfeitoria removida com sucesso')
    } catch {
      toast.error('Erro ao remover benfeitoria')
    } finally {
      closeDeleteImprovementContainer()
    }
  }, [
    closeDeleteImprovementContainer,
    mutateHandleDeleteImprovement,
    propertyId,
    queryClient,
    selectedImprovement,
  ])

  return (
    <AlertDialog.Root
      open={isOpenDeleteImprovementContainer}
      onOpenChange={closeDeleteImprovementContainer}
    >
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>
            {`Deseja remover a benfeitoria ${selectedImprovement?.description}`}
          </AlertDialog.Title>
          <AlertDialog.Description>
            Não será possível desfazer essa ação!
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancelar</AlertDialog.Cancel>
          <AlertDialog.Action onClick={handleDeleteImprovement}>
            Remover
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

ImprovementDeleteDialog.displayName = 'ImprovementDeleteDialog'
