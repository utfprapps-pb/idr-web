import { useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { Button, Form, Sheet } from '@/core/presentation/components/ui'
import { useHookForm } from '@/core/presentation/hooks'

import { makeRemoteCreateAnimalChildBirthUseCase } from '../../../main/factories/use-cases'
import { useAnimalChildBirthContext } from '../../hooks/animal-child-birth-context.hook'
import {
  animalChildBirthFormSchema,
  AnimalChildBirthFormSchema,
} from '../../validations/animal-child-birth-form-schema'

import { AnimalChildBirthFormInputs } from './animal-child-birth-form-inputs'
import { ANIMAL_CHILD_BIRTH_INITIAL_FORM_DATA } from './animal-child-birth-initial-data'

export function CreateAnimalChildBirthForm() {
  const {
    propertyId,
    animalId,
    isOpenNewAnimalChildBirthForm,
    closeNewAnimalChildBirthForm,
  } = useAnimalChildBirthContext()

  const createAnimalChildBirthUseCase =
    makeRemoteCreateAnimalChildBirthUseCase()

  const queryClient = useQueryClient()

  const form = useHookForm<AnimalChildBirthFormSchema>({
    defaultValues: ANIMAL_CHILD_BIRTH_INITIAL_FORM_DATA,
    resolver: zodResolver(animalChildBirthFormSchema),
  })

  const { mutateAsync: mutateHandleCreateAnimalChildBirth } = useMutation({
    mutationFn: createAnimalChildBirthUseCase.execute,
  })

  const handleCreateAnimalChildBirth = useCallback(
    async (data: AnimalChildBirthFormSchema) => {
      try {
        await mutateHandleCreateAnimalChildBirth({
          propertyId,
          animalId,
          animalChildBirth: data,
        })

        queryClient.invalidateQueries({
          queryKey: ['animal-child-births'],
          exact: false,
        })

        toast.success('Parto de animal foi cadastrado com sucesso')

        form.reset(ANIMAL_CHILD_BIRTH_INITIAL_FORM_DATA)

        closeNewAnimalChildBirthForm()
      } catch {
        toast.error('Erro ao cadastrar parto de animal')
      }
    },
    [
      animalId,
      closeNewAnimalChildBirthForm,
      form,
      mutateHandleCreateAnimalChildBirth,
      propertyId,
      queryClient,
    ]
  )

  return (
    <Sheet.Root
      open={isOpenNewAnimalChildBirthForm}
      onOpenChange={closeNewAnimalChildBirthForm}
    >
      <Sheet.Content className="overflow-y-scroll h-screen" side="right">
        <Sheet.Header>
          <Sheet.Title>Novo Parto</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para criar um novo parto
          </Sheet.Description>
        </Sheet.Header>

        <Form.Provider {...form}>
          <form
            id="create-animal-child-birth-form"
            className="flex flex-col h-full gap-4"
            onSubmit={form.handleSubmit(handleCreateAnimalChildBirth)}
          >
            <AnimalChildBirthFormInputs />
          </form>
        </Form.Provider>

        <Sheet.Footer>
          <Button
            form="create-animal-child-birth-form"
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

CreateAnimalChildBirthForm.displayName = 'CreateAnimalChildBirthForm'
