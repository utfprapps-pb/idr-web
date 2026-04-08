import { useCallback } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { AlertDialog } from '@/core/presentation/components/ui'

import { makeRemoteDeleteInputUseProductCategoryUseCase } from '../../../main/factories/use-cases/input-use-product-categories-use-cases'
import { useInputUseProductCategoryContext } from '../../hooks/input-use-product-category-context.hook'

export function InputUseProductCategoryDeleteDialog() {
  const deleteInputUseProductCategoryUseCase =
    makeRemoteDeleteInputUseProductCategoryUseCase()

  const {
    selectedInputUseProductCategory,
    isOpenDeleteInputUseProductCategoryContainer,
    closeDeleteInputUseProductCategoryContainer,
  } = useInputUseProductCategoryContext()

  const queryClient = useQueryClient()

  const { mutateAsync: mutateHandleDeleteInputUseProductCategory } =
    useMutation({
      mutationFn: deleteInputUseProductCategoryUseCase.execute,
    })

  const handleDeleteInputUseProductCategory = useCallback(async () => {
    if (!selectedInputUseProductCategory?.id) {
      toast.error('Erro ao remover categoria de produto')
      return
    }

    try {
      await mutateHandleDeleteInputUseProductCategory({
        id: selectedInputUseProductCategory.id,
      })

      queryClient.invalidateQueries({
        queryKey: ['input-use-product-categories'],
        exact: false,
      })

      toast.success('Categoria de produto removido com sucesso')
    } catch {
      toast.error('Erro ao remover categoria de produto')
    } finally {
      closeDeleteInputUseProductCategoryContainer()
    }
  }, [
    closeDeleteInputUseProductCategoryContainer,
    mutateHandleDeleteInputUseProductCategory,
    queryClient,
    selectedInputUseProductCategory,
  ])

  return (
    <AlertDialog.Root
      open={isOpenDeleteInputUseProductCategoryContainer}
      onOpenChange={closeDeleteInputUseProductCategoryContainer}
    >
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>
            {`Deseja remover o categoria de produto
            ${selectedInputUseProductCategory?.name}?`}
          </AlertDialog.Title>
          <AlertDialog.Description>
            Não será possível desfazer essa ação!
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancelar</AlertDialog.Cancel>
          <AlertDialog.Action onClick={handleDeleteInputUseProductCategory}>
            Remover
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

InputUseProductCategoryDeleteDialog.displayName =
  'InputUseProductCategoryDeleteDialog'
