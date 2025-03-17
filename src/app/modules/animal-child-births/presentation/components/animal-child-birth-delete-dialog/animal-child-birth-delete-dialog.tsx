import { useCallback } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { AlertDialog } from '@/core/presentation/components/ui'

import { makeRemoteDeleteAnimalChildBirthUseCase } from '../../../main/factories/use-cases'
import { useAnimalChildBirthContext } from '../../hooks/animal-child-birth-context.hook'

export function AnimalChildBirthDeleteDialog() {
  const deleteAnimalChildBirthUseCase =
    makeRemoteDeleteAnimalChildBirthUseCase()

  const {
    propertyId,
    animalId,
    selectedAnimalChildBirth,
    isOpenDeleteAnimalChildBirthContainer,
    closeDeleteAnimalChildBirthContainer,
  } = useAnimalChildBirthContext()

  const queryClient = useQueryClient()

  const { mutateAsync: mutateHandleDeleteAnimalChildBirth } = useMutation({
    mutationFn: deleteAnimalChildBirthUseCase.execute,
  })

  const handleDeleteAnimalChildBirth = useCallback(async () => {
    if (!selectedAnimalChildBirth?.id) {
      toast.error('Erro ao remover parto do animal')
      return
    }

    try {
      await mutateHandleDeleteAnimalChildBirth({
        propertyId,
        animalId,
        id: selectedAnimalChildBirth.id,
      })

      queryClient.invalidateQueries({
        queryKey: ['animal-child-births'],
        exact: false,
      })

      toast.success('Parto do animal removido com sucesso')
    } catch {
      toast.error('Erro ao remover parto do animal')
    } finally {
      closeDeleteAnimalChildBirthContainer()
    }
  }, [
    animalId,
    closeDeleteAnimalChildBirthContainer,
    mutateHandleDeleteAnimalChildBirth,
    propertyId,
    queryClient,
    selectedAnimalChildBirth,
  ])

  return (
    <AlertDialog.Root
      open={isOpenDeleteAnimalChildBirthContainer}
      onOpenChange={closeDeleteAnimalChildBirthContainer}
    >
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>
            {`Deseja remover o parto do animal ${selectedAnimalChildBirth?.breed}`}
          </AlertDialog.Title>
          <AlertDialog.Description>
            Não será possível desfazer essa ação!
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancelar</AlertDialog.Cancel>
          <AlertDialog.Action onClick={handleDeleteAnimalChildBirth}>
            Remover
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

AnimalChildBirthDeleteDialog.displayName = 'AnimalChildBirthDeleteDialog'
