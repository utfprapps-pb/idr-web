import { useCallback } from 'react'

import { useQueryClient, useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { AlertDialog } from '@/core/presentation/components/ui'

import { makeRemoteDeleteGeneralCultivationUseCase } from '../../../main/factories/use-cases/general-cultivations-use-cases'
import { useGeneralCultivationContext } from '../../hooks/general-cultivation-context.hook'

export function GeneralCultivationDeleteDialog() {
  const deleteGeneralCultivationUseCase =
    makeRemoteDeleteGeneralCultivationUseCase()

  const {
    selectedGeneralCultivation,
    isOpenDeleteGeneralCultivationContainer,
    closeDeleteGeneralCultivationContainer,
  } = useGeneralCultivationContext()

  const queryClient = useQueryClient()

  const { mutateAsync: mutateHandleDeleteGeneralCultivation } = useMutation({
    mutationFn: deleteGeneralCultivationUseCase.execute,
  })

  const handleDeleteGeneralCultivation = useCallback(async () => {
    if (!selectedGeneralCultivation) {
      toast.error('Erro ao remover cultivo geral')
      return
    }

    try {
      await mutateHandleDeleteGeneralCultivation({
        id: selectedGeneralCultivation.id,
      })

      queryClient.invalidateQueries({
        queryKey: ['general-cultivations'],
        exact: false,
      })

      toast.success('Cultivo geral removido com sucesso')
    } catch {
      toast.error('Erro ao remover cultivo geral')
    } finally {
      closeDeleteGeneralCultivationContainer()
    }
  }, [
    closeDeleteGeneralCultivationContainer,
    mutateHandleDeleteGeneralCultivation,
    queryClient,
    selectedGeneralCultivation,
  ])

  return (
    <AlertDialog.Root
      open={isOpenDeleteGeneralCultivationContainer}
      onOpenChange={closeDeleteGeneralCultivationContainer}
    >
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>
            {`Deseja remover o cultivo geral ${selectedGeneralCultivation?.name}?`}
          </AlertDialog.Title>
          <AlertDialog.Description>
            Não será possível desfazer essa ação!
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancelar</AlertDialog.Cancel>
          <AlertDialog.Action onClick={handleDeleteGeneralCultivation}>
            Remover
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

GeneralCultivationDeleteDialog.displayName = 'GeneralCultivationDeleteDialog'
