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

import { makeRemoteUpdateAnimalDeathUseCase } from '../../../main/factories/use-cases/animal-deaths-use-cases'
import { useAnimalDeathContext } from '../../hooks/animal-death-context.hook'
import { useAnimalDeathQuery } from '../../hooks/queries/animal-death-query.hook'
import {
  animalDeathFormSchema,
  type AnimalDeathFormSchema,
} from '../../validations/animal-death-form-schema'

import { AnimalDeathFormInputs } from './animal-death-form-inputs'
import { ANIMAL_DEATH_INITIAL_FORM_DATA } from './animal-death-initial-data'

export function EditAnimalDeathForm() {
  const {
    propertyId,
    animalId,
    isOpenEditAnimalDeathForm,
    closeEditAnimalDeathForm,
    selectedAnimalDeath,
  } = useAnimalDeathContext()

  const { isLoading, animalDeath } = useAnimalDeathQuery({
    id: selectedAnimalDeath!.id,
    propertyId,
    animalId,
  })

  const updateAnimalDeathUseCase = makeRemoteUpdateAnimalDeathUseCase()

  const queryClient = useQueryClient()

  const form = useHookForm<AnimalDeathFormSchema>({
    defaultValues: ANIMAL_DEATH_INITIAL_FORM_DATA,
    ...(animalDeath && {
      values: {
        ...animalDeath,
      },
    }),
    resolver: zodResolver(animalDeathFormSchema),
  })

  const { mutateAsync: mutateHandleUpdateAnimalDeath } = useMutation({
    mutationFn: updateAnimalDeathUseCase.execute,
  })

  const handleUpdateAnimalDeath = useCallback(
    async (data: AnimalDeathFormSchema) => {
      try {
        if (!selectedAnimalDeath) {
          toast.error('Erro ao atualizar óbito do animal')
          return
        }

        await mutateHandleUpdateAnimalDeath({
          animalDeath: {
            ...data,
            id: selectedAnimalDeath.id,
          },
          animalId,
          propertyId,
        })
        queryClient.invalidateQueries({
          queryKey: ['animal-deaths'],
          exact: false,
        })
        toast.success('Óbito do animal foi editado com sucesso')
        form.reset(ANIMAL_DEATH_INITIAL_FORM_DATA)
        closeEditAnimalDeathForm()
      } catch {
        toast.error('Erro ao salvar alterações')
      }
    },
    [
      animalId,
      closeEditAnimalDeathForm,
      form,
      mutateHandleUpdateAnimalDeath,
      propertyId,
      queryClient,
      selectedAnimalDeath,
    ]
  )

  return (
    <Sheet.Root
      open={isOpenEditAnimalDeathForm}
      onOpenChange={closeEditAnimalDeathForm}
    >
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>
            Editar Óbito do animal do dia{' '}
            {selectedAnimalDeath?.date
              ? format(selectedAnimalDeath.date, 'dd/MM/yyyy')
              : '-'}
          </Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para editar o óbito do animal
          </Sheet.Description>
        </Sheet.Header>
        <Form.Provider {...form}>
          <ScrollArea.Root>
            <form
              id="update-animal-death-form"
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(handleUpdateAnimalDeath)}
            >
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <Loading size="lg" />
                </div>
              ) : (
                <AnimalDeathFormInputs />
              )}
            </form>
          </ScrollArea.Root>
        </Form.Provider>

        <Sheet.Footer>
          <Button
            type="submit"
            form="update-animal-death-form"
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

EditAnimalDeathForm.displayName = 'EditAnimalDeathForm'
