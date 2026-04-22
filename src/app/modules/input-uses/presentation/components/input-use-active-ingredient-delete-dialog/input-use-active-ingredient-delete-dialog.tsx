import { useCallback } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { AlertDialog } from '@/core/presentation/components/ui'

import { makeRemoteDeleteInputUseActiveIngredientUseCase } from '../../../main/factories/use-cases/input-use-active-ingredients-use-cases'
import { useInputUseActiveIngredientContext } from '../../hooks/input-use-active-ingredient-context.hook'

export function InputUseActiveIngredientDeleteDialog() {
  const deleteInputUseActiveIngredientUseCase =
    makeRemoteDeleteInputUseActiveIngredientUseCase()

  const {
    selectedInputUseActiveIngredient,
    isOpenDeleteInputUseActiveIngredientContainer,
    closeDeleteInputUseActiveIngredientContainer,
  } = useInputUseActiveIngredientContext()

  const queryClient = useQueryClient()

  const { mutateAsync: mutateHandleDeleteInputUseActiveIngredient } =
    useMutation({
      mutationFn: deleteInputUseActiveIngredientUseCase.execute,
    })

  const handleDeleteInputUseActiveIngredient = useCallback(async () => {
    if (!selectedInputUseActiveIngredient?.id) {
      toast.error('Erro ao remover princípio ativo')
      return
    }

    try {
      await mutateHandleDeleteInputUseActiveIngredient({
        id: selectedInputUseActiveIngredient.id,
      })

      queryClient.invalidateQueries({
        queryKey: ['input-use-active-ingredients'],
        exact: false,
      })

      toast.success('Princípio ativo removido com sucesso')
    } catch {
      toast.error('Erro ao remover princípio ativo')
    } finally {
      closeDeleteInputUseActiveIngredientContainer()
    }
  }, [
    closeDeleteInputUseActiveIngredientContainer,
    mutateHandleDeleteInputUseActiveIngredient,
    queryClient,
    selectedInputUseActiveIngredient,
  ])

  return (
    <AlertDialog.Root
      open={isOpenDeleteInputUseActiveIngredientContainer}
      onOpenChange={closeDeleteInputUseActiveIngredientContainer}
    >
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>
            {`Deseja remover o princípio ativo ${selectedInputUseActiveIngredient?.name}?`}
          </AlertDialog.Title>
          <AlertDialog.Description>
            Não será possível desfazer essa ação!
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancelar</AlertDialog.Cancel>
          <AlertDialog.Action onClick={handleDeleteInputUseActiveIngredient}>
            Remover
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

InputUseActiveIngredientDeleteDialog.displayName =
  'InputUseActiveIngredientDeleteDialog'
