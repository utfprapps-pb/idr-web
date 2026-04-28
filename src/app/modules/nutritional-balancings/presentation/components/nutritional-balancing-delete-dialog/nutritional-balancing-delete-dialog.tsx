import { useCallback } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import toast from 'react-hot-toast'

import { AlertDialog } from '@/core/presentation/components/ui'

import { makeRemoteDeleteNutritionalBalancingUseCase } from '../../../main/factories'
import { useNutritionalBalancingContext } from '../../hooks/nutritional-balancing-context.hook'

export function NutritionalBalancingDeleteDialog() {
  const deleteNutritionalBalancingUseCase =
    makeRemoteDeleteNutritionalBalancingUseCase()

  const {
    propertyId,
    selectedNutritionalBalancing,
    isOpenDeleteNutritionalBalancingContainer,
    closeDeleteNutritionalBalancingContainer,
  } = useNutritionalBalancingContext()

  const queryClient = useQueryClient()

  const { mutateAsync: mutateHandleDeleteNutritionalBalancing } = useMutation({
    mutationFn: deleteNutritionalBalancingUseCase.execute,
  })

  const handleDeleteNutritionalBalancing = useCallback(async () => {
    if (!selectedNutritionalBalancing) {
      toast.error('Erro ao remover balanceamento nutricional')
      return
    }

    try {
      await mutateHandleDeleteNutritionalBalancing({
        propertyId,
        nutritionalBalancingId: selectedNutritionalBalancing.id,
      })

      queryClient.invalidateQueries({
        queryKey: ['nutritional-balancings', propertyId],
        exact: false,
      })

      toast.success('Balanceamento nutricional removido com sucesso')
    } catch {
      toast.error('Erro ao remover balanceamento nutricional')
    } finally {
      closeDeleteNutritionalBalancingContainer()
    }
  }, [
    closeDeleteNutritionalBalancingContainer,
    mutateHandleDeleteNutritionalBalancing,
    propertyId,
    queryClient,
    selectedNutritionalBalancing,
  ])

  return (
    <AlertDialog.Root
      open={isOpenDeleteNutritionalBalancingContainer}
      onOpenChange={closeDeleteNutritionalBalancingContainer}
    >
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>{`Deseja remover o balanceamento nutricional do animal ${selectedNutritionalBalancing?.animal} no dia ${selectedNutritionalBalancing?.date ? format(selectedNutritionalBalancing?.date, 'dd/MM/yyyy') : '-'}?`}</AlertDialog.Title>
          <AlertDialog.Description>
            Não será possível desfazer essa ação!
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancelar</AlertDialog.Cancel>
          <AlertDialog.Action onClick={handleDeleteNutritionalBalancing}>
            Remover
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

NutritionalBalancingDeleteDialog.displayName =
  'NutritionalBalancingDeleteDialog'
