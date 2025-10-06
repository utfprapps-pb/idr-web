import { useCallback } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import toast from 'react-hot-toast'

import { AlertDialog } from '@/core/presentation/components/ui'

import { makeRemoteDeleteAnimalMedicationUseCase } from '../../../main/factories/use-cases/animal-medications-use-cases'
import { useAnimalMedicationContext } from '../../hooks/animal-medication-context.hook'

export function AnimalMedicationDeleteDialog() {
  const deleteAnimalMedicationUseCase =
    makeRemoteDeleteAnimalMedicationUseCase()

  const {
    propertyId,
    animalId,
    selectedAnimalMedication,
    isOpenDeleteAnimalMedicationContainer,
    closeDeleteAnimalMedicationContainer,
  } = useAnimalMedicationContext()

  const queryClient = useQueryClient()

  const { mutateAsync: mutateHandleDeleteAnimalMedication } = useMutation({
    mutationFn: deleteAnimalMedicationUseCase.execute,
  })

  const handleDeleteAnimalMedication = useCallback(async () => {
    if (!selectedAnimalMedication?.id) {
      toast.error('Erro ao remover medicação do animal')
      return
    }

    try {
      await mutateHandleDeleteAnimalMedication({
        propertyId,
        animalId,
        id: selectedAnimalMedication.id,
      })

      queryClient.invalidateQueries({
        queryKey: ['animal-medications'],
        exact: false,
      })

      toast.success('Medicação do animal removida com sucesso')
    } catch {
      toast.error('Erro ao remover medicação do animal')
    } finally {
      closeDeleteAnimalMedicationContainer()
    }
  }, [
    animalId,
    closeDeleteAnimalMedicationContainer,
    mutateHandleDeleteAnimalMedication,
    propertyId,
    queryClient,
    selectedAnimalMedication,
  ])

  return (
    <AlertDialog.Root
      open={isOpenDeleteAnimalMedicationContainer}
      onOpenChange={closeDeleteAnimalMedicationContainer}
    >
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>
            {`Deseja remover a medicação do dia ${selectedAnimalMedication?.date ? format(selectedAnimalMedication.date, 'dd/MM/yyyy') : '-'}?`}
          </AlertDialog.Title>
          <AlertDialog.Description>
            Não será possível desfazer essa ação!
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancelar</AlertDialog.Cancel>
          <AlertDialog.Action onClick={handleDeleteAnimalMedication}>
            Remover
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

AnimalMedicationDeleteDialog.displayName = 'AnimalMedicationDeleteDialog'
