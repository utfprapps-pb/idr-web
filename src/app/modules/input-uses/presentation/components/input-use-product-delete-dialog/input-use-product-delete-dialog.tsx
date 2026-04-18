import { useCallback } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { AlertDialog } from '@/core/presentation/components/ui'

import { makeRemoteDeleteInputUseProductUseCase } from '../../../main/factories/use-cases/input-use-products-use-cases'
import { useInputUseProductContext } from '../../hooks/input-use-product-context.hook'

export function InputUseProductDeleteDialog() {
  const {
    isOpenDeleteInputUseProductContainer,
    closeDeleteInputUseProductContainer,
    selectedInputUseProduct,
  } = useInputUseProductContext()

  const deleteInputUseProductUseCase = makeRemoteDeleteInputUseProductUseCase()

  const queryClient = useQueryClient()

  const { mutateAsync: mutateHandleDeleteInputUseProduct } = useMutation({
    mutationFn: deleteInputUseProductUseCase.execute,
  })

  const handleDeleteInputUseProduct = useCallback(async () => {
    if (!selectedInputUseProduct?.id) {
      toast.error('Erro ao remover produto')
      return
    }

    try {
      await mutateHandleDeleteInputUseProduct({
        id: selectedInputUseProduct.id,
      })

      queryClient.invalidateQueries({
        queryKey: ['input-use-products'],
        exact: false,
      })

      toast.success('Produto removido com sucesso')
    } catch {
      toast.error('Erro ao remover produto')
    } finally {
      closeDeleteInputUseProductContainer()
    }
  }, [
    closeDeleteInputUseProductContainer,
    mutateHandleDeleteInputUseProduct,
    queryClient,
    selectedInputUseProduct,
  ])

  return (
    <AlertDialog.Root
      open={isOpenDeleteInputUseProductContainer}
      onOpenChange={closeDeleteInputUseProductContainer}
    >
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>{`Deseja remover o produto ${selectedInputUseProduct?.name}?`}</AlertDialog.Title>
          <AlertDialog.Description>
            Não será possível desfazer essa ação!
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancelar</AlertDialog.Cancel>
          <AlertDialog.Action onClick={handleDeleteInputUseProduct}>
            Remover
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

InputUseProductDeleteDialog.displayName = 'InputUseProductDeleteDialog'
