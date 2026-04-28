import { useCallback } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { AlertDialog } from '@/core/presentation/components/ui'

import { makeRemoteDeleteCultivationDiseaseUseCase } from '../../../main/factories/use-cases/cultivation-diseases-use-cases'
import { useCultivationDiseaseContext } from '../../hooks/cultivation-disease-context.hook'

export function CultivationDiseaseDeleteDialog() {
  const deleteCultivationDiseaseUseCase =
    makeRemoteDeleteCultivationDiseaseUseCase()

  const {
    propertyId,
    selectedCultivationDisease,
    isOpenDeleteCultivationDiseaseContainer,
    closeDeleteCultivationDiseaseContainer,
  } = useCultivationDiseaseContext()

  const queryClient = useQueryClient()

  const { mutateAsync: mutateHandleDeleteCultivationDisease } = useMutation({
    mutationFn: deleteCultivationDiseaseUseCase.execute,
  })

  const handleDeleteCultivationDisease = useCallback(async () => {
    if (!selectedCultivationDisease?.id) {
      toast.error('Erro ao remover doença do cultivo')
      return
    }

    try {
      await mutateHandleDeleteCultivationDisease({
        propertyId,
        id: selectedCultivationDisease.id,
      })

      queryClient.invalidateQueries({
        queryKey: ['cultivation-diseases', propertyId],
        exact: false,
      })

      toast.success('Doença do cultivo removido com sucesso')
    } catch {
      toast.error('Erro ao remover doença do cultivo')
    } finally {
      closeDeleteCultivationDiseaseContainer()
    }
  }, [
    closeDeleteCultivationDiseaseContainer,
    mutateHandleDeleteCultivationDisease,
    propertyId,
    queryClient,
    selectedCultivationDisease,
  ])

  return (
    <AlertDialog.Root
      open={isOpenDeleteCultivationDiseaseContainer}
      onOpenChange={closeDeleteCultivationDiseaseContainer}
    >
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>
            {`Deseja remover a doença do cultivo
            ${selectedCultivationDisease?.cultivation}?`}
          </AlertDialog.Title>
          <AlertDialog.Description>
            Não será possível desfazer essa ação!
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancelar</AlertDialog.Cancel>
          <AlertDialog.Action onClick={handleDeleteCultivationDisease}>
            Remover
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

CultivationDiseaseDeleteDialog.displayName = 'CultivationDiseaseDeleteDialog'
