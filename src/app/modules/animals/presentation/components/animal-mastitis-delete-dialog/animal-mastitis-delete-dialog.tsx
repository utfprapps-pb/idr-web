import { useCallback } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import toast from 'react-hot-toast'

import { AlertDialog } from '@/core/presentation/components/ui'

import { makeRemoteDeleteAnimalMastitisUseCase } from '../../../main/factories/use-cases/animal-mastitides-use-cases'
import { useAnimalMastitisContext } from '../../hooks/animal-mastitis-context.hook'

export function AnimalMastitisDeleteDialog() {
  const deleteAnimalMastitisUseCase = makeRemoteDeleteAnimalMastitisUseCase()

  const {
    propertyId,
    animalId,
    selectedAnimalMastitis,
    isOpenDeleteAnimalMastitisContainer,
    closeDeleteAnimalMastitisContainer,
  } = useAnimalMastitisContext()

  const queryClient = useQueryClient()

  const { mutateAsync: mutateHandleDeleteAnimalMastitis } = useMutation({
    mutationFn: deleteAnimalMastitisUseCase.execute,
  })

  const handleDeleteAnimalMastitis = useCallback(async () => {
    if (!selectedAnimalMastitis?.id) {
      toast.error('Erro ao remover mastite do animal')
      return
    }

    try {
      await mutateHandleDeleteAnimalMastitis({
        propertyId,
        animalId,
        id: selectedAnimalMastitis.id,
      })

      queryClient.invalidateQueries({
        queryKey: ['animal-mastitides', propertyId],
        exact: false,
      })

      toast.success('Mastite removida com sucesso')
    } catch {
      toast.error('Erro ao remover mastite do animal')
    } finally {
      closeDeleteAnimalMastitisContainer()
    }
  }, [
    animalId,
    closeDeleteAnimalMastitisContainer,
    mutateHandleDeleteAnimalMastitis,
    propertyId,
    queryClient,
    selectedAnimalMastitis,
  ])

  return (
    <AlertDialog.Root
      open={isOpenDeleteAnimalMastitisContainer}
      onOpenChange={closeDeleteAnimalMastitisContainer}
    >
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>
            {`Deseja remover a mastite do dia ${selectedAnimalMastitis?.date ? format(selectedAnimalMastitis.date, 'dd/MM/yyyy') : '-'}?`}
          </AlertDialog.Title>
          <AlertDialog.Description>
            Não será possível desfazer essa ação!
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancelar</AlertDialog.Cancel>
          <AlertDialog.Action onClick={handleDeleteAnimalMastitis}>
            Remover
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

AnimalMastitisDeleteDialog.displayName = 'AnimalMastitisDeleteDialog'
