import React, { useCallback } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { AnimalDataFactory } from '@/main/factories/useCases/animal'
import { AlertDialog } from '@/presentation/components/ui'

import { useAnimalContext } from '../../hooks/useAnimalContext'

export const AnimalDeleteDialog: React.FC = () => {
  const deleteAnimal = AnimalDataFactory.makeRemoteDeleteAnimal()

  const {
    propertyId,
    selectedAnimal,
    isOpenDeleteAnimalContainer,
    closeDeleteAnimalContainer,
  } = useAnimalContext()

  const queryClient = useQueryClient()

  const { mutateAsync: mutateHandleDeleteAnimal } = useMutation({
    mutationFn: deleteAnimal.execute,
  })

  const handleDeleteAnimal = useCallback(async () => {
    if (!selectedAnimal) {
      toast.error('Erro ao remover animal')
      return
    }

    try {
      await mutateHandleDeleteAnimal({
        propertyId,
        animalId: selectedAnimal.id,
      })

      queryClient.invalidateQueries({
        queryKey: ['animals'],
        exact: false,
      })

      toast.success('Animal removido com sucesso')
    } catch {
      toast.error('Erro ao remover animal')
    } finally {
      closeDeleteAnimalContainer()
    }
  }, [
    closeDeleteAnimalContainer,
    mutateHandleDeleteAnimal,
    propertyId,
    queryClient,
    selectedAnimal,
  ])

  return (
    <AlertDialog.Root
      open={isOpenDeleteAnimalContainer}
      onOpenChange={closeDeleteAnimalContainer}
    >
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>{`Deseja remover o animal ${selectedAnimal?.name}`}</AlertDialog.Title>
          <AlertDialog.Description>
            Não será possível desfazer essa ação!
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancelar</AlertDialog.Cancel>
          <AlertDialog.Action onClick={handleDeleteAnimal}>
            Remover
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}
