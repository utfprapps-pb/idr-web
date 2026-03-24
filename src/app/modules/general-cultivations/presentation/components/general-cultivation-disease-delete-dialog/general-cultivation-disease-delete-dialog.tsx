import { useCallback } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { AlertDialog } from '@/core/presentation/components/ui'

import { makeRemoteDeleteGeneralCultivationDiseaseUseCase } from '../../../main/factories/use-cases/general-cultivation-diseases-use-cases'
import { useGeneralCultivationDiseaseContext } from '../../hooks/general-cultivation-disease-context.hook'

export function GeneralCultivationDiseaseDeleteDialog() {
  const deleteGeneralCultivationDiseaseUseCase =
    makeRemoteDeleteGeneralCultivationDiseaseUseCase()

  const {
    selectedGeneralCultivationDisease,
    isOpenDeleteGeneralCultivationDiseaseContainer,
    closeDeleteGeneralCultivationDiseaseContainer,
  } = useGeneralCultivationDiseaseContext()

  const queryClient = useQueryClient()

  const { mutateAsync: mutateHandleDeleteGeneralCultivationDisease } =
    useMutation({
      mutationFn: deleteGeneralCultivationDiseaseUseCase.execute,
    })

  const handleDeleteGeneralCultivationDisease = useCallback(async () => {
    if (!selectedGeneralCultivationDisease) {
      toast.error('Erro ao remover doença de cultivo geral')
      return
    }

    try {
      await mutateHandleDeleteGeneralCultivationDisease({
        id: selectedGeneralCultivationDisease.id,
      })

      queryClient.invalidateQueries({
        queryKey: ['general-cultivation-diseases'],
        exact: false,
      })

      toast.success('Doença de cultivo geral removida com sucesso')
    } catch {
      toast.error('Erro ao remover doença de cultivo geral')
    } finally {
      closeDeleteGeneralCultivationDiseaseContainer()
    }
  }, [
    closeDeleteGeneralCultivationDiseaseContainer,
    mutateHandleDeleteGeneralCultivationDisease,
    queryClient,
    selectedGeneralCultivationDisease,
  ])

  return (
    <AlertDialog.Root
      open={isOpenDeleteGeneralCultivationDiseaseContainer}
      onOpenChange={closeDeleteGeneralCultivationDiseaseContainer}
    >
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>
            {`Deseja remover a doença de cultivo geral ${selectedGeneralCultivationDisease?.name}?`}
          </AlertDialog.Title>
          <AlertDialog.Description>
            Não será possível desfazer essa ação!
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancelar</AlertDialog.Cancel>
          <AlertDialog.Action onClick={handleDeleteGeneralCultivationDisease}>
            Remover
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

GeneralCultivationDiseaseDeleteDialog.displayName =
  'GeneralCultivationDiseaseDeleteDialog'
