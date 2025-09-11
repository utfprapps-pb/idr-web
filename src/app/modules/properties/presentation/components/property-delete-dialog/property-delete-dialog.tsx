import { useCallback } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { AlertDialog } from '@/core/presentation/components/ui'

import { makeRemoteDeletePropertyUseCase } from '../../../main/factories/use-cases'
import { usePropertyContext } from '../../hooks/property-context.hook'

export function PropertyDeleteDialog() {
  const deletePropertyUseCase = makeRemoteDeletePropertyUseCase()

  const {
    propertySelected,
    isOpenDeletePropertyContainer,
    closeDeletePropertyContainer,
  } = usePropertyContext()

  const queryClient = useQueryClient()

  const { mutateAsync: mutateHandleDeleteProperty } = useMutation({
    mutationFn: deletePropertyUseCase.execute,
  })

  const handleDeleteProperty = useCallback(async () => {
    try {
      if (!propertySelected?.id) {
        toast.error('Não foi possível remover essa propriedade')
        return
      }

      await mutateHandleDeleteProperty(propertySelected.id)

      queryClient.invalidateQueries({
        queryKey: ['properties'],
        exact: false,
      })

      toast.success('Propriedade removida com sucesso')
    } catch {
      toast.error('Não foi possível remover essa propriedade')
    }
  }, [mutateHandleDeleteProperty, propertySelected, queryClient])

  return (
    <AlertDialog.Root
      open={isOpenDeletePropertyContainer}
      onOpenChange={closeDeletePropertyContainer}
    >
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>
            {`Deseja remover a propriedade ${propertySelected!.name}`}
          </AlertDialog.Title>
          <AlertDialog.Description>
            Não será possível desfazer essa ação!
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancelar</AlertDialog.Cancel>
          <AlertDialog.Action onClick={() => handleDeleteProperty()}>
            Remover
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

PropertyDeleteDialog.displayName = 'PropertyDeleteDialog'
