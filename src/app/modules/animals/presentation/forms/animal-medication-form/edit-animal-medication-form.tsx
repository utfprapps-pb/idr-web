import { useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import toast from 'react-hot-toast'

import { floatMask } from '@/core/masker'
import {
  Button,
  Form,
  Loading,
  ScrollArea,
  Sheet,
} from '@/core/presentation/components/ui'
import { useHookForm } from '@/core/presentation/hooks'

import { makeRemoteUpdateAnimalMedicationUseCase } from '../../../main/factories/use-cases/animal-medications-use-cases'
import { useAnimalMedicationContext } from '../../hooks/animal-medication-context.hook'
import { useAnimalMedicationQuery } from '../../hooks/queries/animal-medication-query.hook'
import {
  animalMedicationFormSchema,
  type AnimalMedicationFormSchema,
} from '../../validations/animal-medication-form-schema'

import { AnimalMedicationFormInputs } from './animal-medication-form-inputs'
import { ANIMAL_MEDICATION_INITIAL_FORM_DATA } from './animal-medication-initial-form-data'

export function EditAnimalMedicationForm() {
  const {
    propertyId,
    animalId,
    isOpenEditAnimalMedicationForm,
    closeEditAnimalMedicationForm,
    selectedAnimalMedication,
  } = useAnimalMedicationContext()

  const { isLoading, animalMedication } = useAnimalMedicationQuery({
    id: selectedAnimalMedication!.id,
    propertyId,
    animalId,
  })

  const updateAnimalMedicationUseCase =
    makeRemoteUpdateAnimalMedicationUseCase()

  const queryClient = useQueryClient()

  const form = useHookForm<AnimalMedicationFormSchema>({
    defaultValues: ANIMAL_MEDICATION_INITIAL_FORM_DATA,
    ...(animalMedication && {
      values: {
        ...animalMedication,
        appliedDose: floatMask(animalMedication.appliedDose, 'mg/ml'),
        product: {
          ...animalMedication.product,
          extraData: {
            activeIngredient: String(
              animalMedication.product.extraData?.activeIngredient ?? ''
            ),
          },
        },
      },
    }),
    resolver: zodResolver(animalMedicationFormSchema),
  })

  const { mutateAsync: mutateHandleUpdateAnimalMedication } = useMutation({
    mutationFn: updateAnimalMedicationUseCase.execute,
  })

  const handleUpdateAnimalMedication = useCallback(
    async (data: AnimalMedicationFormSchema) => {
      try {
        if (!selectedAnimalMedication) {
          toast.error('Erro ao atualizar medicação do animal')
          return
        }

        await mutateHandleUpdateAnimalMedication({
          animalMedication: {
            ...data,
            id: selectedAnimalMedication.id,
          },
          animalId,
          propertyId,
        })
        queryClient.invalidateQueries({
          queryKey: ['animal-medications'],
          exact: false,
        })
        toast.success('Medicação do animal foi editada com sucesso')
        form.reset(ANIMAL_MEDICATION_INITIAL_FORM_DATA)
        closeEditAnimalMedicationForm()
      } catch {
        toast.error('Erro ao salvar alterações')
      }
    },
    [
      animalId,
      closeEditAnimalMedicationForm,
      form,
      mutateHandleUpdateAnimalMedication,
      propertyId,
      queryClient,
      selectedAnimalMedication,
    ]
  )

  return (
    <Sheet.Root
      open={isOpenEditAnimalMedicationForm}
      onOpenChange={closeEditAnimalMedicationForm}
    >
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>{`Editar Medicação do dia ${selectedAnimalMedication?.date ? format(selectedAnimalMedication.date, 'dd/MM/yyyy') : '-'}`}</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para editar a medicação do animal
          </Sheet.Description>
        </Sheet.Header>
        <Form.Provider {...form}>
          <ScrollArea.Root>
            <form
              id="update-animal-medication-form"
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(handleUpdateAnimalMedication)}
            >
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <Loading size="lg" />
                </div>
              ) : (
                <AnimalMedicationFormInputs />
              )}
            </form>
          </ScrollArea.Root>
        </Form.Provider>

        <Sheet.Footer>
          <Button
            type="submit"
            form="update-animal-medication-form"
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

EditAnimalMedicationForm.displayName = 'EditAnimalMedicationForm'
