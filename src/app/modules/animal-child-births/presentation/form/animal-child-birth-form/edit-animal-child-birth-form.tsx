import { useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { Button, Form, Loading, Sheet } from '@/core/presentation/components/ui'
import { useHookForm } from '@/core/presentation/hooks'

import { makeRemoteUpdateAnimalChildBirthUseCase } from '../../../main/factories/use-cases'
import { useAnimalChildBirthContext } from '../../hooks/animal-child-birth-context.hook'
import { useAnimalChildBirthQuery } from '../../hooks/queries/animal-child-birth-query.hook'
import {
  animalChildBirthFormSchema,
  type AnimalChildBirthFormSchema,
} from '../../validations/animal-child-birth-form-schema'

import { AnimalChildBirthFormInputs } from './animal-child-birth-form-inputs'
import { ANIMAL_CHILD_BIRTH_INITIAL_FORM_DATA } from './animal-child-birth-initial-data'

export function EditAnimalChildBirthForm() {
  const {
    propertyId,
    animalId,
    isOpenEditAnimalChildBirthForm,
    closeEditAnimalChildBirthForm,
    selectedAnimalChildBirth,
  } = useAnimalChildBirthContext()

  const { isLoading, animalChildBirth } = useAnimalChildBirthQuery({
    id: selectedAnimalChildBirth!.id,
    propertyId,
    animalId,
  })

  const updateAnimalChildBirthUseCase =
    makeRemoteUpdateAnimalChildBirthUseCase()

  const queryClient = useQueryClient()

  const form = useHookForm<AnimalChildBirthFormSchema>({
    defaultValues: ANIMAL_CHILD_BIRTH_INITIAL_FORM_DATA,
    ...(animalChildBirth && {
      values: {
        ...animalChildBirth,
      },
    }),
    resolver: zodResolver(animalChildBirthFormSchema),
  })

  const { mutateAsync: mutateHandleUpdateAnimalChildBirth } = useMutation({
    mutationFn: updateAnimalChildBirthUseCase.execute,
  })

  const handleUpdateAnimalChildBirth = useCallback(
    async (data: AnimalChildBirthFormSchema) => {
      try {
        if (!selectedAnimalChildBirth) {
          toast.error('Erro ao atualizar parto do animal')
          return
        }

        await mutateHandleUpdateAnimalChildBirth({
          animalChildBirth: {
            ...data,
            id: selectedAnimalChildBirth.id,
          },
          animalId,
          propertyId,
        })
        queryClient.invalidateQueries({
          queryKey: ['animals'],
          exact: false,
        })
        toast.success('Animal foi editado com sucesso')
        form.reset(ANIMAL_CHILD_BIRTH_INITIAL_FORM_DATA)
        closeEditAnimalChildBirthForm()
      } catch {
        toast.error('Erro ao salvar alterações')
      }
    },
    [
      animalId,
      closeEditAnimalChildBirthForm,
      form,
      mutateHandleUpdateAnimalChildBirth,
      propertyId,
      queryClient,
      selectedAnimalChildBirth,
    ]
  )

  return (
    <Sheet.Root
      open={isOpenEditAnimalChildBirthForm}
      onOpenChange={closeEditAnimalChildBirthForm}
    >
      <Sheet.Content className="overflow-y-scroll h-screen" side="right">
        <Sheet.Header>
          <Sheet.Title>{`Editar Parto do Animal ${selectedAnimalChildBirth?.breed}`}</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para editar o parto do animal
          </Sheet.Description>
        </Sheet.Header>
        <Form.Provider {...form}>
          <form
            id="update-animal-child-birth-form"
            className="flex flex-col h-full gap-4"
            onSubmit={form.handleSubmit(handleUpdateAnimalChildBirth)}
          >
            {isLoading ? (
              <div className="flex justify-center h-full items-center">
                <Loading size="lg" />
              </div>
            ) : (
              <AnimalChildBirthFormInputs />
            )}
          </form>
        </Form.Provider>

        <Sheet.Footer>
          <Button
            type="submit"
            form="update-animal-child-birth-form"
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

EditAnimalChildBirthForm.displayName = 'EditAnimalChildBirthForm'
