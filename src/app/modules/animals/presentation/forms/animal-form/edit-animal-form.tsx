import { useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { Button, Form, Loading, Sheet } from '@/core/presentation/components/ui'
import { useHookForm } from '@/core/presentation/hooks'

import { makeRemoteUpdateAnimalUseCase } from '../../../main/factories/use-cases'
import { useAnimalContext } from '../../hooks/animal-context.hook'
import { useAnimalQuery } from '../../hooks/queries'
import {
  animalFormSchema,
  type AnimalFormSchema,
} from '../../validations/animal-form-schema'

import { AnimalFormInputs } from './animal-form-inputs'
import { ANIMAL_INITIAL_FORM_DATA } from './animal-initial-form-data'

export function EditAnimalForm() {
  const {
    propertyId,
    isOpenEditAnimalForm,
    closeEditAnimalForm,
    selectedAnimal,
  } = useAnimalContext()

  const { isLoading, animal } = useAnimalQuery({
    id: selectedAnimal!.id,
    propertyId,
  })

  const updateAnimalUseCase = makeRemoteUpdateAnimalUseCase()

  const queryClient = useQueryClient()

  const form = useHookForm<AnimalFormSchema>({
    defaultValues: ANIMAL_INITIAL_FORM_DATA,
    ...(animal && {
      values: {
        ...animal,
      },
    }),
    resolver: zodResolver(animalFormSchema),
  })

  const { reset, handleSubmit: hookFormSubmit } = form

  const { mutateAsync: mutateHandleUpdateAnimal } = useMutation({
    mutationFn: updateAnimalUseCase.execute,
  })

  const handleUpdateAnimal = useCallback(
    async (data: AnimalFormSchema) => {
      try {
        if (!selectedAnimal) {
          toast.error('Erro ao atualizar animal')
          return
        }

        await mutateHandleUpdateAnimal({
          animal: {
            ...data,
            id: selectedAnimal.id,
          },
          propertyId,
        })
        queryClient.invalidateQueries({
          queryKey: ['animals'],
          exact: false,
        })
        toast.success('Animal foi editado com sucesso')
        reset(ANIMAL_INITIAL_FORM_DATA)
        closeEditAnimalForm()
      } catch {
        toast.error('Erro ao salvar alterações')
      }
    },
    [
      closeEditAnimalForm,
      mutateHandleUpdateAnimal,
      propertyId,
      queryClient,
      reset,
      selectedAnimal,
    ]
  )

  return (
    <Sheet.Root open={isOpenEditAnimalForm} onOpenChange={closeEditAnimalForm}>
      <Sheet.Content className="overflow-y-scroll h-screen" side="right">
        <Sheet.Header>
          <Sheet.Title>{`Editar Animal ${selectedAnimal?.name}`}</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para editar o animal
          </Sheet.Description>
        </Sheet.Header>
        <Form.Provider {...form}>
          <form
            id="update-animal-form"
            className="flex flex-col h-full gap-4"
            onSubmit={hookFormSubmit(handleUpdateAnimal)}
          >
            {isLoading ? (
              <div className="flex justify-center h-full items-center">
                <Loading size="lg" />
              </div>
            ) : (
              <AnimalFormInputs />
            )}
          </form>
        </Form.Provider>

        <Sheet.Footer>
          <Button
            type="submit"
            form="update-animal-form"
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

EditAnimalForm.displayName = 'EditAnimalForm'
