import React, { useCallback } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { ImprovementDataFactory } from '@/main/factories/useCases/improvement'
import { AlertDialog } from '@/presentation/components/ui'

import { useImprovementContext } from '../../hooks/useImprovementContext'

export const ImprovementDeleteDialog: React.FC = () => {
  const deleteImprovement = ImprovementDataFactory.makeRemoteDeleteImprovement()

  const {
    propertyId,
    selectedImprovement,
    isOpenDeleteImprovementContainer,
    closeDeleteImprovementContainer,
  } = useImprovementContext()

  const queryClient = useQueryClient()

  const { mutateAsync: mutateHandleDeleteImprovement } = useMutation({
    mutationFn: deleteImprovement.execute,
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
          <AlertDialog.Title>{`Deseja remover a benfeitoria ${selectedImprovement?.description}`}</AlertDialog.Title>
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
