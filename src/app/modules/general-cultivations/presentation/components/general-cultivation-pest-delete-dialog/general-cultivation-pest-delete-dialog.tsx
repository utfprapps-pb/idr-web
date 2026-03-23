import { useCallback } from 'react'

import { useQueryClient, useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { AlertDialog } from '@/core/presentation/components/ui'

import { makeRemoteDeleteGeneralCultivationPestUseCase } from '../../../main/factories/use-cases/general-cultivation-pests-use-cases'
import { useGeneralCultivationPestContext } from '../../hooks/general-cultivation-pest-context.hook'

export function GeneralCultivationPestDeleteDialog() {
  const deleteGeneralCultivationPestUseCase =
    makeRemoteDeleteGeneralCultivationPestUseCase()

  const {
    selectedGeneralCultivationPest,
    isOpenDeleteGeneralCultivationPestContainer,
    closeDeleteGeneralCultivationPestContainer,
  } = useGeneralCultivationPestContext()

  const queryClient = useQueryClient()

  const { mutateAsync: mutateHandleDeleteGeneralCultivationPest } = useMutation(
    {
      mutationFn: deleteGeneralCultivationPestUseCase.execute,
    }
  )

  const handleDeleteGeneralCultivationPest = useCallback(async () => {
    if (!selectedGeneralCultivationPest) {
      toast.error('Erro ao remover praga de cultivo geral')
      return
    }

    try {
      await mutateHandleDeleteGeneralCultivationPest({
        id: selectedGeneralCultivationPest.id,
      })

      queryClient.invalidateQueries({
        queryKey: ['general-cultivation-pests'],
        exact: false,
      })

      toast.success('Praga de cultivo geral removida com sucesso')
    } catch {
      toast.error('Erro ao remover praga de cultivo geral')
    } finally {
      closeDeleteGeneralCultivationPestContainer()
    }
  }, [
    closeDeleteGeneralCultivationPestContainer,
    mutateHandleDeleteGeneralCultivationPest,
    queryClient,
    selectedGeneralCultivationPest,
  ])

  return (
    <AlertDialog.Root
      open={isOpenDeleteGeneralCultivationPestContainer}
      onOpenChange={closeDeleteGeneralCultivationPestContainer}
    >
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>
            {`Deseja remover a praga de cultivo geral ${selectedGeneralCultivationPest?.name}?`}
          </AlertDialog.Title>
          <AlertDialog.Description>
            Não será possível desfazer essa ação!
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancelar</AlertDialog.Cancel>
          <AlertDialog.Action onClick={handleDeleteGeneralCultivationPest}>
            Remover
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

GeneralCultivationPestDeleteDialog.displayName =
  'GeneralCultivationPestDeleteDialog'
