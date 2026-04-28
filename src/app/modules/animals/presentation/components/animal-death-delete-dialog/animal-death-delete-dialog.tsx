import { useCallback } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import toast from 'react-hot-toast'

import { AlertDialog } from '@/core/presentation/components/ui'

import { makeRemoteDeleteAnimalDeathUseCase } from '../../../main/factories/use-cases/animal-deaths-use-cases'
import { useAnimalDeathContext } from '../../hooks/animal-death-context.hook'

export function AnimalDeathDeleteDialog() {
  const deleteAnimalDeathUseCase = makeRemoteDeleteAnimalDeathUseCase()

  const {
    propertyId,
    animalId,
    selectedAnimalDeath,
    isOpenDeleteAnimalDeathContainer,
    closeDeleteAnimalDeathContainer,
  } = useAnimalDeathContext()

  const queryClient = useQueryClient()

  const { mutateAsync: mutateHandleDeleteAnimalDeath } = useMutation({
    mutationFn: deleteAnimalDeathUseCase.execute,
  })

  const handleDeleteAnimalDeath = useCallback(async () => {
    if (!selectedAnimalDeath?.id) {
      toast.error('Erro ao remover óbito do animal')
      return
    }

    try {
      await mutateHandleDeleteAnimalDeath({
        propertyId,
        animalId,
        id: selectedAnimalDeath.id,
      })

      queryClient.invalidateQueries({
        queryKey: ['animal-deaths', propertyId],
        exact: false,
      })

      toast.success('Óbito do animal removido com sucesso')
    } catch {
      toast.error('Erro ao remover óbito do animal')
    } finally {
      closeDeleteAnimalDeathContainer()
    }
  }, [
    animalId,
    closeDeleteAnimalDeathContainer,
    mutateHandleDeleteAnimalDeath,
    propertyId,
    queryClient,
    selectedAnimalDeath,
  ])

  return (
    <AlertDialog.Root
      open={isOpenDeleteAnimalDeathContainer}
      onOpenChange={closeDeleteAnimalDeathContainer}
    >
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>
            {`Deseja remover o óbito do animal do dia
            ${
              selectedAnimalDeath?.date
                ? format(selectedAnimalDeath.date, 'dd/MM/yyyy')
                : '-'
            }`}
          </AlertDialog.Title>
          <AlertDialog.Description>
            Não será possível desfazer essa ação!
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancelar</AlertDialog.Cancel>
          <AlertDialog.Action onClick={handleDeleteAnimalDeath}>
            Remover
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

AnimalDeathDeleteDialog.displayName = 'AnimalDeathDeleteDialog'
