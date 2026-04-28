import { useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import {
  Button,
  Form,
  Loading,
  ScrollArea,
  Sheet,
} from '@/core/presentation/components/ui'
import { useHookForm } from '@/core/presentation/hooks'

import { makeRemoteUpdateAnimalPregnancyDiagnosisUseCase } from '../../../main/factories/use-cases/animal-pregnancy-diagnoses-use-cases'
import { useAnimalPregnancyDiagnosisContext } from '../../hooks/animal-pregnancy-diagnosis-context.hook'
import { useAnimalPregnancyDiagnosisQuery } from '../../hooks/queries/animal-pregnancy-diagnosis-query.hook'
import {
  type AnimalPregnancyDiagnosisFormSchema,
  animalPregnancyDiagnosisFormSchema,
} from '../../validations/animal-pregnancy-diagnosis-form-schema'

import { AnimalPregnancyDiagnosisFormInputs } from './animal-pregnancy-diagnosis-form-inputs'
import { ANIMAL_PREGNANCY_DIAGNOSIS_INITIAL_FORM_DATA } from './animal-pregnancy-diagnosis-initial-form-data'

export function EditAnimalPregnancyDiagnosisForm() {
  const {
    propertyId,
    animalId,
    isOpenEditAnimalPregnancyDiagnosisForm,
    closeEditAnimalPregnancyDiagnosisForm,
    selectedAnimalPregnancyDiagnosis,
  } = useAnimalPregnancyDiagnosisContext()

  const { isLoading, animalPregnancyDiagnosis } =
    useAnimalPregnancyDiagnosisQuery({
      id: selectedAnimalPregnancyDiagnosis!.id,
      propertyId,
      animalId,
    })

  const updateAnimalPregnancyDiagnosisUseCase =
    makeRemoteUpdateAnimalPregnancyDiagnosisUseCase()

  const queryClient = useQueryClient()

  const form = useHookForm<AnimalPregnancyDiagnosisFormSchema>({
    defaultValues: ANIMAL_PREGNANCY_DIAGNOSIS_INITIAL_FORM_DATA,
    ...(animalPregnancyDiagnosis && {
      values: {
        ...animalPregnancyDiagnosis,
      },
    }),
    resolver: zodResolver(animalPregnancyDiagnosisFormSchema),
  })

  const { mutateAsync: mutateHandleUpdateAnimalPregnancyDiagnosis, error } =
    useMutation({
      mutationFn: updateAnimalPregnancyDiagnosisUseCase.execute,
    })

  const handleUpdateAnimalPregnancyDiagnosis = useCallback(
    async (data: AnimalPregnancyDiagnosisFormSchema) => {
      try {
        if (!selectedAnimalPregnancyDiagnosis) {
          toast.error('Nenhum diagnóstico selecionado para atualizar')
          return
        }

        await mutateHandleUpdateAnimalPregnancyDiagnosis({
          animalPregnancyDiagnosis: {
            ...data,
            id: selectedAnimalPregnancyDiagnosis.id,
          },
          animalId,
          propertyId,
        })
        queryClient.invalidateQueries({
          queryKey: ['animal-pregnancy-diagnoses', propertyId],
          exact: false,
        })
        toast.success('Diagnóstico de gestação atualizado com sucesso')
        form.reset(ANIMAL_PREGNANCY_DIAGNOSIS_INITIAL_FORM_DATA)
        closeEditAnimalPregnancyDiagnosisForm()
      } catch {
        toast.error(error?.message ?? 'Erro ao salvar alterações')
      }
    },
    [
      animalId,
      closeEditAnimalPregnancyDiagnosisForm,
      error,
      form,
      mutateHandleUpdateAnimalPregnancyDiagnosis,
      propertyId,
      queryClient,
      selectedAnimalPregnancyDiagnosis,
    ]
  )

  return (
    <Sheet.Root
      open={isOpenEditAnimalPregnancyDiagnosisForm}
      onOpenChange={closeEditAnimalPregnancyDiagnosisForm}
    >
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>Editar Diagnóstico de Gestação</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para editar o diagnóstico de gestação do
            animal
          </Sheet.Description>
        </Sheet.Header>
        <Form.Provider {...form}>
          <ScrollArea.Root>
            <form
              id="update-animal-pregnancy-diagnosis-form"
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(handleUpdateAnimalPregnancyDiagnosis)}
            >
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <Loading size="lg" />
                </div>
              ) : (
                <AnimalPregnancyDiagnosisFormInputs />
              )}
            </form>
          </ScrollArea.Root>
        </Form.Provider>

        <Sheet.Footer>
          <Button
            type="submit"
            form="update-animal-pregnancy-diagnosis-form"
            className="w-full"
            disabled={form.buttonDisabled}
          >
            Salvar
          </Button>
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet.Root>
  )
}

EditAnimalPregnancyDiagnosisForm.displayName =
  'EditAnimalPregnancyDiagnosisForm'
