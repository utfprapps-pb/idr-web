import { useCallback } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import toast from 'react-hot-toast'

import { AlertDialog } from '@/core/presentation/components/ui'

import { makeRemoteDeleteAnimalDiseaseUseCase } from '../../../main/factories/use-cases/animal-diseases-use-cases'
import { useAnimalDiseaseContext } from '../../hooks/animal-disease-context.hook'

export function AnimalDiseaseDeleteDialog() {
  const deleteAnimalDiseaseUseCase = makeRemoteDeleteAnimalDiseaseUseCase()

  const {
    propertyId,
    animalId,
    selectedAnimalDisease,
    isOpenDeleteAnimalDiseaseContainer,
    closeDeleteAnimalDiseaseContainer,
  } = useAnimalDiseaseContext()

  const queryClient = useQueryClient()

  const { mutateAsync: mutateHandleDeleteAnimalDisease } = useMutation({
    mutationFn: deleteAnimalDiseaseUseCase.execute,
  })

  const handleDeleteAnimalDisease = useCallback(async () => {
    if (!selectedAnimalDisease?.id) {
      toast.error('Erro ao remover doença do animal')
      return
    }

    try {
      await mutateHandleDeleteAnimalDisease({
        propertyId,
        animalId,
        id: selectedAnimalDisease.id,
      })

      queryClient.invalidateQueries({
        queryKey: ['animal-diseases'],
        exact: false,
      })

      toast.success('Doença do animal removido com sucesso')
    } catch {
      toast.error('Erro ao remover doença do animal')
    } finally {
      closeDeleteAnimalDiseaseContainer()
    }
  }, [
    animalId,
    closeDeleteAnimalDiseaseContainer,
    mutateHandleDeleteAnimalDisease,
    propertyId,
    queryClient,
    selectedAnimalDisease,
  ])

  return (
    <AlertDialog.Root
      open={isOpenDeleteAnimalDiseaseContainer}
      onOpenChange={closeDeleteAnimalDiseaseContainer}
    >
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>
            {`Deseja remover a doença do animal do dia
            ${
              selectedAnimalDisease?.diagnosticDate
                ? format(selectedAnimalDisease.diagnosticDate, 'dd/MM/yyyy')
                : '-'
            }`}
          </AlertDialog.Title>
          <AlertDialog.Description>
            Não será possível desfazer essa ação!
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancelar</AlertDialog.Cancel>
          <AlertDialog.Action onClick={handleDeleteAnimalDisease}>
            Remover
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

AnimalDiseaseDeleteDialog.displayName = 'AnimalDiseaseDeleteDialog'
