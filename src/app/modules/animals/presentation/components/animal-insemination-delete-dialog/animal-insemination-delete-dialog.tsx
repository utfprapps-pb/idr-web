import { useCallback } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import toast from 'react-hot-toast'

import { AlertDialog } from '@/core/presentation/components/ui'

import { makeRemoteDeleteAnimalInseminationUseCase } from '../../../main/factories/use-cases/animal-inseminations-use-cases'
import { useAnimalInseminationContext } from '../../hooks/animal-insemination-context.hook'

export function AnimalInseminationDeleteDialog() {
  const deleteAnimalInseminationUseCase =
    makeRemoteDeleteAnimalInseminationUseCase()

  const {
    propertyId,
    animalId,
    selectedAnimalInsemination,
    isOpenDeleteAnimalInseminationContainer,
    closeDeleteAnimalInseminationContainer,
  } = useAnimalInseminationContext()

  const queryClient = useQueryClient()

  const { mutateAsync: mutateHandleDeleteAnimalInsemination } = useMutation({
    mutationFn: deleteAnimalInseminationUseCase.execute,
  })

  const handleDeleteAnimalInsemination = useCallback(async () => {
    if (!selectedAnimalInsemination?.id) {
      toast.error('Erro ao remover inseminação artificial')
      return
    }

    try {
      await mutateHandleDeleteAnimalInsemination({
        propertyId,
        animalId,
        id: selectedAnimalInsemination.id,
      })

      queryClient.invalidateQueries({
        queryKey: ['animal-inseminations'],
        exact: false,
      })

      toast.success('Inseminação Artificial removida com sucesso')
    } catch {
      toast.error('Erro ao remover inseminação artificial')
    } finally {
      closeDeleteAnimalInseminationContainer()
    }
  }, [
    animalId,
    closeDeleteAnimalInseminationContainer,
    mutateHandleDeleteAnimalInsemination,
    propertyId,
    queryClient,
    selectedAnimalInsemination,
  ])

  return (
    <AlertDialog.Root
      open={isOpenDeleteAnimalInseminationContainer}
      onOpenChange={closeDeleteAnimalInseminationContainer}
    >
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>
            {`Deseja remover a Inseminação Artificial do dia ${selectedAnimalInsemination?.date ? format(selectedAnimalInsemination.date, 'dd/MM/yyyy') : '-'}?`}
          </AlertDialog.Title>
          <AlertDialog.Description>
            Não será possível desfazer essa ação!
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancelar</AlertDialog.Cancel>
          <AlertDialog.Action onClick={handleDeleteAnimalInsemination}>
            Remover
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

AnimalInseminationDeleteDialog.displayName = 'AnimalInseminationDeleteDialog'
