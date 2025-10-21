import { useCallback } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { AlertDialog } from '@/core/presentation/components/ui'

import { makeRemoteDeleteCultivationPestUseCase } from '../../../main/factories/use-cases/cultivation-pests-use-cases'
import { useCultivationPestContext } from '../../hooks/cultivation-pest-context.hook'

export function CultivationPestDeleteDialog() {
  const deleteCultivationPestUseCase = makeRemoteDeleteCultivationPestUseCase()

  const {
    propertyId,
    selectedCultivationPest,
    isOpenDeleteCultivationPestContainer,
    closeDeleteCultivationPestContainer,
  } = useCultivationPestContext()

  const queryClient = useQueryClient()

  const { mutateAsync: mutateHandleDeleteCultivationPest } = useMutation({
    mutationFn: deleteCultivationPestUseCase.execute,
  })

  const handleDeleteCultivationPest = useCallback(async () => {
    if (!selectedCultivationPest?.id) {
      toast.error('Erro ao remover praga do cultivo')
      return
    }

    try {
      await mutateHandleDeleteCultivationPest({
        propertyId,
        id: selectedCultivationPest.id,
      })

      queryClient.invalidateQueries({
        queryKey: ['cultivation-pests'],
        exact: false,
      })

      toast.success('Praga do cultivo removida com sucesso')
    } catch {
      toast.error('Erro ao remover praga do cultivo')
    } finally {
      closeDeleteCultivationPestContainer()
    }
  }, [
    closeDeleteCultivationPestContainer,
    mutateHandleDeleteCultivationPest,
    propertyId,
    queryClient,
    selectedCultivationPest,
  ])

  return (
    <AlertDialog.Root
      open={isOpenDeleteCultivationPestContainer}
      onOpenChange={closeDeleteCultivationPestContainer}
    >
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>
            {`Deseja remover a praga do cultivo
            ${selectedCultivationPest?.cultivation}?`}
          </AlertDialog.Title>
          <AlertDialog.Description>
            Não será possível desfazer essa ação!
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancelar</AlertDialog.Cancel>
          <AlertDialog.Action onClick={handleDeleteCultivationPest}>
            Remover
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

CultivationPestDeleteDialog.displayName = 'CultivationPestDeleteDialog'
