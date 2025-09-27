import { useCallback } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import toast from 'react-hot-toast'

import { AlertDialog } from '@/core/presentation/components/ui'

import { makeRemoteDeleteAnimalSaleUseCase } from '../../../main/factories/use-cases/animal-sales-use-cases'
import { useAnimalSaleContext } from '../../hooks/animal-sale-context.hook'

export function AnimalSaleDeleteDialog() {
  const deleteAnimalSaleUseCase = makeRemoteDeleteAnimalSaleUseCase()

  const {
    propertyId,
    animalId,
    selectedAnimalSale,
    isOpenDeleteAnimalSaleContainer,
    closeDeleteAnimalSaleContainer,
  } = useAnimalSaleContext()

  const queryClient = useQueryClient()

  const { mutateAsync: mutateHandleDeleteAnimalSale } = useMutation({
    mutationFn: deleteAnimalSaleUseCase.execute,
  })

  const handleDeleteAnimalSale = useCallback(async () => {
    if (!selectedAnimalSale?.id) {
      toast.error('Erro ao remover venda do animal')
      return
    }

    try {
      await mutateHandleDeleteAnimalSale({
        propertyId,
        animalId,
        id: selectedAnimalSale.id,
      })

      queryClient.invalidateQueries({
        queryKey: ['animal-sales'],
        exact: false,
      })

      toast.success('Venda do animal removido com sucesso')
    } catch {
      toast.error('Erro ao remover venda do animal')
    } finally {
      closeDeleteAnimalSaleContainer()
    }
  }, [
    animalId,
    closeDeleteAnimalSaleContainer,
    mutateHandleDeleteAnimalSale,
    propertyId,
    queryClient,
    selectedAnimalSale,
  ])

  return (
    <AlertDialog.Root
      open={isOpenDeleteAnimalSaleContainer}
      onOpenChange={closeDeleteAnimalSaleContainer}
    >
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>
            {`Deseja remover a venda do animal do dia
            ${
              selectedAnimalSale?.date
                ? format(selectedAnimalSale.date, 'dd/MM/yyyy')
                : '-'
            }`}
          </AlertDialog.Title>
          <AlertDialog.Description>
            Não será possível desfazer essa ação!
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancelar</AlertDialog.Cancel>
          <AlertDialog.Action onClick={handleDeleteAnimalSale}>
            Remover
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

AnimalSaleDeleteDialog.displayName = 'AnimalSaleDeleteDialog'
