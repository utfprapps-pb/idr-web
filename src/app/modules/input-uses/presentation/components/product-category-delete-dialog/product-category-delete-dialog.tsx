import { useCallback } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { AlertDialog } from '@/core/presentation/components/ui'

import { makeRemoteDeleteProductCategoryUseCase } from '../../../main/factories/use-cases/product-categories-use-cases'
import { useProductCategoryContext } from '../../hooks/product-category-context.hook'

export function ProductCategoryDeleteDialog() {
  const deleteProductCategoryUseCase = makeRemoteDeleteProductCategoryUseCase()

  const {
    selectedProductCategory,
    isOpenDeleteProductCategoryContainer,
    closeDeleteProductCategoryContainer,
  } = useProductCategoryContext()

  const queryClient = useQueryClient()

  const { mutateAsync: mutateHandleDeleteProductCategory } = useMutation({
    mutationFn: deleteProductCategoryUseCase.execute,
  })

  const handleDeleteProductCategory = useCallback(async () => {
    if (!selectedProductCategory?.id) {
      toast.error('Erro ao remover categoria de produto')
      return
    }

    try {
      await mutateHandleDeleteProductCategory({
        id: selectedProductCategory.id,
      })

      queryClient.invalidateQueries({
        queryKey: ['product-categories'],
        exact: false,
      })

      toast.success('Categoria de produto removido com sucesso')
    } catch {
      toast.error('Erro ao remover categoria de produto')
    } finally {
      closeDeleteProductCategoryContainer()
    }
  }, [
    closeDeleteProductCategoryContainer,
    mutateHandleDeleteProductCategory,
    queryClient,
    selectedProductCategory,
  ])

  return (
    <AlertDialog.Root
      open={isOpenDeleteProductCategoryContainer}
      onOpenChange={closeDeleteProductCategoryContainer}
    >
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>
            {`Deseja remover o categoria de produto
            ${selectedProductCategory?.name}?`}
          </AlertDialog.Title>
          <AlertDialog.Description>
            Não será possível desfazer essa ação!
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancelar</AlertDialog.Cancel>
          <AlertDialog.Action onClick={handleDeleteProductCategory}>
            Remover
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

ProductCategoryDeleteDialog.displayName = 'ProductCategoryDeleteDialog'
