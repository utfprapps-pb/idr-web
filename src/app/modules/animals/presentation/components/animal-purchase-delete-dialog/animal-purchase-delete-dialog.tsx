import { useCallback } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import toast from 'react-hot-toast'

import { AlertDialog } from '@/core/presentation/components/ui'

import { makeRemoteDeleteAnimalPurchaseUseCase } from '../../../main/factories/use-cases/animal-purchases-use-cases'
import { useAnimalPurchaseContext } from '../../hooks/animal-purchase-context.hook'

export function AnimalPurchaseDeleteDialog() {
  const deleteAnimalPurchaseUseCase = makeRemoteDeleteAnimalPurchaseUseCase()

  const {
    propertyId,
    animalId,
    selectedAnimalPurchase,
    isOpenDeleteAnimalPurchaseContainer,
    closeDeleteAnimalPurchaseContainer,
  } = useAnimalPurchaseContext()

  const queryClient = useQueryClient()

  const { mutateAsync: mutateHandleDeleteAnimalPurchase } = useMutation({
    mutationFn: deleteAnimalPurchaseUseCase.execute,
  })

  const handleDeleteAnimalPurchase = useCallback(async () => {
    if (!selectedAnimalPurchase?.id) {
      toast.error('Erro ao remover compra do animal')
      return
    }

    try {
      await mutateHandleDeleteAnimalPurchase({
        propertyId,
        animalId,
        id: selectedAnimalPurchase.id,
      })

      queryClient.invalidateQueries({
        queryKey: ['animal-purchases'],
        exact: false,
      })

      toast.success('Compra do animal removido com sucesso')
    } catch {
      toast.error('Erro ao remover compra do animal')
    } finally {
      closeDeleteAnimalPurchaseContainer()
    }
  }, [
    animalId,
    closeDeleteAnimalPurchaseContainer,
    mutateHandleDeleteAnimalPurchase,
    propertyId,
    queryClient,
    selectedAnimalPurchase,
  ])

  return (
    <AlertDialog.Root
      open={isOpenDeleteAnimalPurchaseContainer}
      onOpenChange={closeDeleteAnimalPurchaseContainer}
    >
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>
            {`Deseja remover a compra do animal do dia
            ${
              selectedAnimalPurchase?.date
                ? format(selectedAnimalPurchase.date, 'dd/MM/yyyy')
                : '-'
            }`}
          </AlertDialog.Title>
          <AlertDialog.Description>
            Não será possível desfazer essa ação!
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancelar</AlertDialog.Cancel>
          <AlertDialog.Action onClick={handleDeleteAnimalPurchase}>
            Remover
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

AnimalPurchaseDeleteDialog.displayName = 'AnimalPurchaseDeleteDialog'
