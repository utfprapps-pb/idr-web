import { useCallback } from 'react'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import toast from 'react-hot-toast'

import { AlertDialog } from '@/core/presentation/components/ui'

import { makeRemoteDeleteAnimalPregnancyDiagnosisUseCase } from '../../../main/factories/use-cases/animal-pregnancy-diagnoses-use-cases'
import { useAnimalPregnancyDiagnosisContext } from '../../hooks/animal-pregnancy-diagnosis-context.hook'

export function AnimalPregnancyDiagnosisDeleteDialog() {
  const deleteAnimalPregnancyDiagnosisUseCase =
    makeRemoteDeleteAnimalPregnancyDiagnosisUseCase()

  const {
    propertyId,
    animalId,
    selectedAnimalPregnancyDiagnosis,
    isOpenDeleteAnimalPregnancyDiagnosisContainer,
    closeDeleteAnimalPregnancyDiagnosisContainer,
  } = useAnimalPregnancyDiagnosisContext()

  const queryClient = useQueryClient()

  const { mutateAsync: mutateHandleDeleteAnimalPregnancyDiagnosis, error } =
    useMutation({
      mutationFn: deleteAnimalPregnancyDiagnosisUseCase.execute,
    })

  const handleDeleteAnimalPregnancyDiagnosis = useCallback(async () => {
    if (!selectedAnimalPregnancyDiagnosis?.id) {
      toast.error(
        error?.message ?? 'Selecione um diagnóstico de gestação para remover'
      )
      return
    }

    try {
      await mutateHandleDeleteAnimalPregnancyDiagnosis({
        propertyId,
        animalId,
        id: selectedAnimalPregnancyDiagnosis.id,
      })

      queryClient.invalidateQueries({
        queryKey: ['animal-pregnancy-diagnoses'],
        exact: false,
      })

      toast.success('Diagnóstico de gestação removido com sucesso')
    } catch {
      toast.error(error?.message ?? 'Erro ao remover diagnóstico de gestação')
    } finally {
      closeDeleteAnimalPregnancyDiagnosisContainer()
    }
  }, [
    animalId,
    closeDeleteAnimalPregnancyDiagnosisContainer,
    error,
    mutateHandleDeleteAnimalPregnancyDiagnosis,
    propertyId,
    queryClient,
    selectedAnimalPregnancyDiagnosis,
  ])

  return (
    <AlertDialog.Root
      open={isOpenDeleteAnimalPregnancyDiagnosisContainer}
      onOpenChange={closeDeleteAnimalPregnancyDiagnosisContainer}
    >
      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>
            {`Deseja remover a gestação do animal do dia
            ${
              selectedAnimalPregnancyDiagnosis?.date
                ? format(selectedAnimalPregnancyDiagnosis.date, 'dd/MM/yyyy')
                : '-'
            }`}
          </AlertDialog.Title>
          <AlertDialog.Description>
            Não será possível desfazer essa ação!
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancelar</AlertDialog.Cancel>
          <AlertDialog.Action onClick={handleDeleteAnimalPregnancyDiagnosis}>
            Remover
          </AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  )
}

AnimalPregnancyDiagnosisDeleteDialog.displayName =
  'AnimalPregnancyDiagnosisDeleteDialog'
