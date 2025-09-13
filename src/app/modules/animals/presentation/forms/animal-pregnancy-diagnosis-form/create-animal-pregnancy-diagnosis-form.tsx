import { useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import {
  Button,
  Form,
  ScrollArea,
  Sheet,
} from '@/core/presentation/components/ui'
import { useHookForm } from '@/core/presentation/hooks'

import { makeRemoteCreateAnimalPregnancyDiagnosisUseCase } from '../../../main/factories/use-cases/animal-pregnancy-diagnoses-use-cases'
import { useAnimalPregnancyDiagnosisContext } from '../../hooks/animal-pregnancy-diagnosis-context.hook'
import {
  type AnimalPregnancyDiagnosisFormSchema,
  animalPregnancyDiagnosisFormSchema,
} from '../../validations/animal-pregnancy-diagnosis-form-schema'

import { AnimalPregnancyDiagnosisFormInputs } from './animal-pregnancy-diagnosis-form-inputs'
import { ANIMAL_PREGNANCY_DIAGNOSIS_INITIAL_FORM_DATA } from './animal-pregnancy-diagnosis-initial-data'

export function CreateAnimalPregnancyDiagnosisForm() {
  const {
    propertyId,
    animalId,
    isOpenNewAnimalPregnancyDiagnosisForm,
    closeNewAnimalPregnancyDiagnosisForm,
  } = useAnimalPregnancyDiagnosisContext()

  const createAnimalPregnancyDiagnosisUseCase =
    makeRemoteCreateAnimalPregnancyDiagnosisUseCase()

  const queryClient = useQueryClient()

  const form = useHookForm<AnimalPregnancyDiagnosisFormSchema>({
    defaultValues: ANIMAL_PREGNANCY_DIAGNOSIS_INITIAL_FORM_DATA,
    resolver: zodResolver(animalPregnancyDiagnosisFormSchema),
  })

  const { mutateAsync: mutateHandleCreateAnimalPregnancyDiagnosis, error } =
    useMutation({
      mutationFn: createAnimalPregnancyDiagnosisUseCase.execute,
    })

  const handleCreateAnimalPregnancyDiagnosis = useCallback(
    async (data: AnimalPregnancyDiagnosisFormSchema) => {
      try {
        await mutateHandleCreateAnimalPregnancyDiagnosis({
          propertyId,
          animalId,
          animalPregnancyDiagnosis: data,
        })

        queryClient.invalidateQueries({
          queryKey: ['animal-pregnancy-diagnoses'],
          exact: false,
        })

        toast.success('Diagnóstico de gestação criado com sucesso')

        form.reset(ANIMAL_PREGNANCY_DIAGNOSIS_INITIAL_FORM_DATA)

        closeNewAnimalPregnancyDiagnosisForm()
      } catch {
        toast.error(
          error?.message ?? 'Erro ao cadastrar diagnóstico de gestação'
        )
      }
    },
    [
      animalId,
      closeNewAnimalPregnancyDiagnosisForm,
      error,
      form,
      mutateHandleCreateAnimalPregnancyDiagnosis,
      propertyId,
      queryClient,
    ]
  )

  return (
    <Sheet.Root
      open={isOpenNewAnimalPregnancyDiagnosisForm}
      onOpenChange={closeNewAnimalPregnancyDiagnosisForm}
    >
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>Novo diagnóstico de gestação</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para criar um novo diagnóstico de gestação
          </Sheet.Description>
        </Sheet.Header>

        <Form.Provider {...form}>
          <ScrollArea.Root>
            <form
              id="create-animal-pregnancy-diagnosis-form"
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(handleCreateAnimalPregnancyDiagnosis)}
            >
              <AnimalPregnancyDiagnosisFormInputs />
            </form>
          </ScrollArea.Root>
        </Form.Provider>

        <Sheet.Footer>
          <Button
            form="create-animal-pregnancy-diagnosis-form"
            type="submit"
            className="w-full"
            disabled={form.buttonDisabled}
          >
            Criar
          </Button>
        </Sheet.Footer>
      </Sheet.Content>
    </Sheet.Root>
  )
}

CreateAnimalPregnancyDiagnosisForm.displayName =
  'CreateAnimalPregnancyDiagnosisForm'
