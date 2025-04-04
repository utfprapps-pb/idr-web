import { useCallback } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { AlertDialog } from '@/core/presentation/components/ui'

import { makeRemoteDeleteAnimalHeiferCalfStageUseCase } from '../../../main/factories/use-cases/animal-heifer-calf-stages-use-cases'
import { useAnimalHeiferCalfStageContext } from '../../hooks/animal-heifer-calf-stage-context.hook'

export function AnimalHeiferCalfStageDeleteDialog() {
  const deleteAnimalHeiferCalfStageUseCase =
    makeRemoteDeleteAnimalHeiferCalfStageUseCase()

  const {
    propertyId,
    animalId,
    selectedAnimalHeiferCalfStage,
    isOpenDeleteAnimalHeiferCalfStageContainer,
    closeDeleteAnimalHeiferCalfStageContainer,
  } = useAnimalHeiferCalfStageContext()

  const queryClient = useQueryClient()

  const { mutateAsync: mutateHandleDeleteAnimalHeiferCalfStage } = useMutation({
    mutationFn: deleteAnimalHeiferCalfStageUseCase.execute,
  })

  const handleDeleteAnimalHeiferCalfStage = useCallback(async () => {
    if (!selectedAnimalHeiferCalfStage?.id) {
      toast.error('Erro ao remover a fase bezerra novilha')
      return
    }

    try {
      await mutateHandleDeleteAnimalHeiferCalfStage({
        propertyId,
        animalId,
        id: selectedAnimalHeiferCalfStage.id,
      })

      queryClient.invalidateQueries({
        queryKey: ['animal-heifer-calf-stages'],
        exact: false,
      })

      toast.success('Fase bezerra novilha removido com sucesso')
    } catch {
      toast.error('Erro ao remover fase bezerra novilha')
    } finally {
      closeDeleteAnimalHeiferCalfStageContainer()
    }
  }, [
    animalId,
    closeDeleteAnimalHeiferCalfStageContainer,
    mutateHandleDeleteAnimalHeiferCalfStage,
    propertyId,
    queryClient,
    selectedAnimalHeiferCalfStage,
  ])

  return (
    <AlertDialog.Root
      open={isOpenDeleteAnimalHeiferCalfStageContainer}
      onOpenChange={closeDeleteAnimalHeiferCalfStageContainer}
    >
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>
            {`Deseja remover a fase bezerra novilha do dia ${selectedAnimalHeiferCalfStage?.weighingDate}`}
          </AlertDialog.Title>
          <AlertDialog.Description>
            Não será possível desfazer essa ação!
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancelar</AlertDialog.Cancel>
          <AlertDialog.Action onClick={handleDeleteAnimalHeiferCalfStage}>
            Remover
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

AnimalHeiferCalfStageDeleteDialog.displayName =
  'AnimalHeiferCalfStageDeleteDialog'
