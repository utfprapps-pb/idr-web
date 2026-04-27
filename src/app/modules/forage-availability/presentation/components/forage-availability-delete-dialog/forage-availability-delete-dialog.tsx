import { useCallback } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import toast from 'react-hot-toast'

import { AlertDialog } from '@/core/presentation/components/ui'

import { makeRemoteDeleteForageAvailabilityUseCase } from '../../../main/factories/use-cases/forage-availability-use-cases'
import { useForageAvailabilityContext } from '../../hooks/forage-availability-context.hook'

export function ForageAvailabilityDeleteDialog() {
  const {
    propertyId,
    selectedForageAvailability,
    isOpenDeleteForageAvailabilityContainer,
    closeDeleteForageAvailabilityContainer,
  } = useForageAvailabilityContext()

  const deleteForageAvailabilityUseCase =
    makeRemoteDeleteForageAvailabilityUseCase()

  const queryClient = useQueryClient()

  const { mutateAsync: mutateHandleDeleteForageAvailability } = useMutation({
    mutationFn: deleteForageAvailabilityUseCase.execute,
  })

  const handleDeleteForageAvailability = useCallback(async () => {
    if (!selectedForageAvailability?.id) {
      toast.error('Erro ao remover disponibilidade de forragem')
      return
    }

    try {
      await mutateHandleDeleteForageAvailability({
        propertyId,
        id: selectedForageAvailability.id,
      })

      queryClient.invalidateQueries({
        queryKey: ['forage-availabilities'],
        exact: false,
      })

      toast.success('Disponibilidade de forragem removida com sucesso')
    } catch {
      toast.error('Erro ao remover disponibilidade de forragem')
    } finally {
      closeDeleteForageAvailabilityContainer()
    }
  }, [
    closeDeleteForageAvailabilityContainer,
    mutateHandleDeleteForageAvailability,
    propertyId,
    queryClient,
    selectedForageAvailability,
  ])

  return (
    <AlertDialog.Root
      open={isOpenDeleteForageAvailabilityContainer}
      onOpenChange={closeDeleteForageAvailabilityContainer}
    >
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>
            {`Deseja remover a disponibilidade de forragem de ${
              selectedForageAvailability?.date &&
              format(selectedForageAvailability.date, 'dd/MM/yyyy')
            }?`}
          </AlertDialog.Title>
          <AlertDialog.Description>
            Não será possível desfazer essa ação!
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancelar</AlertDialog.Cancel>
          <AlertDialog.Action onClick={handleDeleteForageAvailability}>
            Remover
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

ForageAvailabilityDeleteDialog.displayName = 'ForageAvailabilityDeleteDialog'
