import { useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import toast from 'react-hot-toast'

import {
  Button,
  Form,
  Loading,
  ScrollArea,
  Sheet,
} from '@/core/presentation/components/ui'
import { useHookForm } from '@/core/presentation/hooks'

import { makeRemoteUpdateAnimalInseminationUseCase } from '../../../main/factories/use-cases/animal-inseminations-use-cases'
import { useAnimalInseminationContext } from '../../hooks/animal-insemination-context.hook'
import { useAnimalInseminationQuery } from '../../hooks/queries/animal-insemination-query.hook'
import {
  animalInseminationFormSchema,
  type AnimalInseminationFormSchema,
} from '../../validations/animal-insemination-form-schema'

import { AnimalInseminationFormInputs } from './animal-insemination-form-inputs'
import { ANIMAL_INSEMINATION_INITIAL_FORM_DATA } from './animal-insemination-initial-data'

export function EditAnimalInseminationForm() {
  const {
    propertyId,
    animalId,
    isOpenEditAnimalInseminationForm,
    closeEditAnimalInseminationForm,
    selectedAnimalInsemination,
  } = useAnimalInseminationContext()

  const { isLoading, animalInsemination } = useAnimalInseminationQuery({
    id: selectedAnimalInsemination!.id,
    propertyId,
    animalId,
  })

  const updateAnimalInseminationUseCase =
    makeRemoteUpdateAnimalInseminationUseCase()

  const queryClient = useQueryClient()

  const form = useHookForm<AnimalInseminationFormSchema>({
    defaultValues: ANIMAL_INSEMINATION_INITIAL_FORM_DATA,
    ...(animalInsemination && {
      values: {
        ...animalInsemination,
      },
    }),
    resolver: zodResolver(animalInseminationFormSchema),
  })

  const { mutateAsync: mutateHandleUpdateAnimalInsemination } = useMutation({
    mutationFn: updateAnimalInseminationUseCase.execute,
  })

  const handleUpdateAnimalInsemination = useCallback(
    async (data: AnimalInseminationFormSchema) => {
      try {
        if (!selectedAnimalInsemination) {
          toast.error('Erro ao atualizar inseminação artificial')
          return
        }

        await mutateHandleUpdateAnimalInsemination({
          animalInsemination: {
            ...data,
            id: selectedAnimalInsemination.id,
          },
          animalId,
          propertyId,
        })
        queryClient.invalidateQueries({
          queryKey: ['animal-inseminations'],
          exact: false,
        })
        toast.success('Inseminação Artificial foi editada com sucesso')
        form.reset(ANIMAL_INSEMINATION_INITIAL_FORM_DATA)
        closeEditAnimalInseminationForm()
      } catch {
        toast.error('Erro ao salvar alterações')
      }
    },
    [
      animalId,
      closeEditAnimalInseminationForm,
      form,
      mutateHandleUpdateAnimalInsemination,
      propertyId,
      queryClient,
      selectedAnimalInsemination,
    ]
  )

  return (
    <Sheet.Root
      open={isOpenEditAnimalInseminationForm}
      onOpenChange={closeEditAnimalInseminationForm}
    >
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>{`Editar Inseminação Artificial do dia ${
            selectedAnimalInsemination?.date
              ? format(selectedAnimalInsemination.date, 'dd/MM/yyyy')
              : '-'
          }`}</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para editar a inseminação artificial
          </Sheet.Description>
        </Sheet.Header>
        <Form.Provider {...form}>
          <ScrollArea.Root>
            <form
              id="update-animal-insemination-form"
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(handleUpdateAnimalInsemination)}
            >
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <Loading size="lg" />
                </div>
              ) : (
                <AnimalInseminationFormInputs />
              )}
            </form>
          </ScrollArea.Root>
        </Form.Provider>

        <Sheet.Footer>
          <Button
            type="submit"
            form="update-animal-insemination-form"
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

EditAnimalInseminationForm.displayName = 'EditAnimalInseminationForm'
