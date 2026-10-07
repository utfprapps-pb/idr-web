import { useCallback } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { AlertDialog } from '@/core/presentation/components/ui'

import { makeRemoteDeleteRegionUseCase } from '../../../main/factories/use-cases'
import { useRegionContext } from '../../hooks/region-context.hook'

export function RegionDeleteDialog() {
  const deleteRegionUseCase = makeRemoteDeleteRegionUseCase()

  const {
    regionSelected,
    isOpenDeleteRegionContainer,
    closeDeleteRegionContainer,
  } = useRegionContext()

  const queryClient = useQueryClient()

  const { mutateAsync: mutateHandleDeleteRegion } = useMutation({
    mutationFn: deleteRegionUseCase.execute,
  })

  const handleDeleteRegion = useCallback(async () => {
    try {
      if (!regionSelected?.id) {
        toast.error('Não foi possível remover essa região')
        return
      }

      await mutateHandleDeleteRegion(regionSelected.id)

      queryClient.invalidateQueries({ queryKey: ['regions'], exact: false })

      toast.success('Região removida com sucesso')
      closeDeleteRegionContainer()
    } catch {
      toast.error('Não foi possível remover essa região')
    }
  }, [
    mutateHandleDeleteRegion,
    regionSelected,
    queryClient,
    closeDeleteRegionContainer,
  ])

  return (
    <AlertDialog.Root
      open={isOpenDeleteRegionContainer}
      onOpenChange={closeDeleteRegionContainer}
    >
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>
            {`Deseja remover a região ${regionSelected?.name}?`}
          </AlertDialog.Title>
          <AlertDialog.Description>
            Não será possível desfazer essa ação!
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancelar</AlertDialog.Cancel>
          <AlertDialog.Action onClick={() => handleDeleteRegion()}>
            Remover
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

RegionDeleteDialog.displayName = 'RegionDeleteDialog'
