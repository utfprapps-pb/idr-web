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

import { makeRemoteCreateAnimalMedicationUseCase } from '../../../main/factories/use-cases/animal-medications-use-cases'
import { useAnimalMedicationContext } from '../../hooks/animal-medication-context.hook'
import {
  animalMedicationFormSchema,
  AnimalMedicationFormSchema,
} from '../../validations/animal-medication-form-schema'

import { AnimalMedicationFormInputs } from './animal-medication-form-inputs'
import { ANIMAL_MEDICATION_INITIAL_FORM_DATA } from './animal-medication-initial-data'

export function CreateAnimalMedicationForm() {
  const {
    propertyId,
    animalId,
    isOpenNewAnimalMedicationForm,
    closeNewAnimalMedicationForm,
  } = useAnimalMedicationContext()

  const createAnimalMedicationUseCase =
    makeRemoteCreateAnimalMedicationUseCase()

  const queryClient = useQueryClient()

  const form = useHookForm<AnimalMedicationFormSchema>({
    defaultValues: ANIMAL_MEDICATION_INITIAL_FORM_DATA,
    resolver: zodResolver(animalMedicationFormSchema),
  })

  const { mutateAsync: mutateHandleCreateAnimalMedication } = useMutation({
    mutationFn: createAnimalMedicationUseCase.execute,
  })

  const handleCreateAnimalMedication = useCallback(
    async (data: AnimalMedicationFormSchema) => {
      try {
        await mutateHandleCreateAnimalMedication({
          propertyId,
          animalId,
          animalMedication: data,
        })

        queryClient.invalidateQueries({
          queryKey: ['animal-medications'],
          exact: false,
        })

        toast.success('Medicação de animal foi cadastrada com sucesso')

        form.reset(ANIMAL_MEDICATION_INITIAL_FORM_DATA)

        closeNewAnimalMedicationForm()
      } catch {
        toast.error('Erro ao cadastrar medicação de animal')
      }
    },
    [
      animalId,
      closeNewAnimalMedicationForm,
      form,
      mutateHandleCreateAnimalMedication,
      propertyId,
      queryClient,
    ]
  )

  return (
    <Sheet.Root
      open={isOpenNewAnimalMedicationForm}
      onOpenChange={closeNewAnimalMedicationForm}
    >
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>Nova Medicação</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para criar uma nova medicação
          </Sheet.Description>
        </Sheet.Header>

        <Form.Provider {...form}>
          <ScrollArea.Root>
            <form
              id="create-animal-medication-form"
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(handleCreateAnimalMedication)}
            >
              <AnimalMedicationFormInputs />
            </form>
          </ScrollArea.Root>
        </Form.Provider>

        <Sheet.Footer>
          <Button
            form="create-animal-medication-form"
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

CreateAnimalMedicationForm.displayName = 'CreateAnimalMedicationForm'
