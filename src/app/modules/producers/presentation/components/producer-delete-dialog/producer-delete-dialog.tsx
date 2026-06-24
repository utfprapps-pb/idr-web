import { useCallback } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { AlertDialog } from '@/core/presentation/components/ui'

import { makeRemoteDeleteProducerUseCase } from '../../../main/factories/use-cases'
import { useProducerContext } from '../../hooks/producer-context.hook'

export function ProducerDeleteDialog() {
  const deleteProducerUseCase = makeRemoteDeleteProducerUseCase()

  const {
    producerSelected,
    isOpenDeleteProducerContainer,
    closeDeleteProducerContainer,
  } = useProducerContext()

  const queryClient = useQueryClient()

  const { mutateAsync: mutateHandleDeleteProducer } = useMutation({
    mutationFn: deleteProducerUseCase.execute,
  })

  const handleDeleteProducer = useCallback(async () => {
    try {
      if (!producerSelected?.id) {
        toast.error('Não foi possível remover esse produtor')
        return
      }

      await mutateHandleDeleteProducer(producerSelected.id)

      queryClient.invalidateQueries({
        queryKey: ['producers'],
        exact: false,
      })

      toast.success('Produtor removido com sucesso')
      closeDeleteProducerContainer()
    } catch {
      toast.error('Não foi possível remover esse produtor')
    }
  }, [
    closeDeleteProducerContainer,
    mutateHandleDeleteProducer,
    producerSelected,
    queryClient,
  ])

  return (
    <AlertDialog.Root
      open={isOpenDeleteProducerContainer}
      onOpenChange={closeDeleteProducerContainer}
    >
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>
            {`Deseja remover o produtor ${producerSelected!.name}?`}
          </AlertDialog.Title>
          <AlertDialog.Description>
            Não será possível desfazer essa ação!
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancelar</AlertDialog.Cancel>
          <AlertDialog.Action onClick={() => handleDeleteProducer()}>
            Remover
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

ProducerDeleteDialog.displayName = 'ProducerDeleteDialog'
