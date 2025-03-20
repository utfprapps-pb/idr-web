import { useCallback } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { AlertDialog } from '@/core/presentation/components/ui'

import { makeRemoteDeleteAnimalChildbirthUseCase } from '../../../main/factories/use-cases/animal-childbirths-use-cases'
import { useAnimalChildbirthContext } from '../../hooks/animal-childbirth-context.hook'

export function AnimalChildbirthDeleteDialog() {
  const deleteAnimalChildbirthUseCase =
    makeRemoteDeleteAnimalChildbirthUseCase()

  const {
    propertyId,
    animalId,
    selectedAnimalChildbirth,
    isOpenDeleteAnimalChildbirthContainer,
    closeDeleteAnimalChildbirthContainer,
  } = useAnimalChildbirthContext()

  const queryClient = useQueryClient()

  const { mutateAsync: mutateHandleDeleteAnimalChildbirth } = useMutation({
    mutationFn: deleteAnimalChildbirthUseCase.execute,
  })

  const handleDeleteAnimalChildbirth = useCallback(async () => {
    if (!selectedAnimalChildbirth?.id) {
      toast.error('Erro ao remover parto do animal')
      return
    }

    try {
      await mutateHandleDeleteAnimalChildbirth({
        propertyId,
        animalId,
        id: selectedAnimalChildbirth.id,
      })

      queryClient.invalidateQueries({
        queryKey: ['animal-child-births'],
        exact: false,
      })

      toast.success('Parto do animal removido com sucesso')
    } catch {
      toast.error('Erro ao remover parto do animal')
    } finally {
      closeDeleteAnimalChildbirthContainer()
    }
  }, [
    animalId,
    closeDeleteAnimalChildbirthContainer,
    mutateHandleDeleteAnimalChildbirth,
    propertyId,
    queryClient,
    selectedAnimalChildbirth,
  ])

  return (
    <AlertDialog.Root
      open={isOpenDeleteAnimalChildbirthContainer}
      onOpenChange={closeDeleteAnimalChildbirthContainer}
    >
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>
            {`Deseja remover o parto do animal ${selectedAnimalChildbirth?.breed}`}
          </AlertDialog.Title>
          <AlertDialog.Description>
            Não será possível desfazer essa ação!
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancelar</AlertDialog.Cancel>
          <AlertDialog.Action onClick={handleDeleteAnimalChildbirth}>
            Remover
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

AnimalChildbirthDeleteDialog.displayName = 'AnimalChildbirthDeleteDialog'
