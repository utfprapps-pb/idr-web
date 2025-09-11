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

import { makeRemoteCreateAnimalUseCase } from '../../../main/factories/use-cases'
import { useAnimalContext } from '../../hooks/animal-context.hook'
import {
  animalFormSchema,
  type AnimalFormSchema,
} from '../../validations/animal-form-schema'

import { AnimalFormInputs } from './animal-form-inputs'
import { ANIMAL_INITIAL_FORM_DATA } from './animal-initial-form-data'

export function CreateAnimalForm() {
  const { propertyId, isOpenNewAnimalForm, closeNewAnimalForm } =
    useAnimalContext()

  const createAnimalUseCase = makeRemoteCreateAnimalUseCase()

  const queryClient = useQueryClient()

  const form = useHookForm<AnimalFormSchema>({
    defaultValues: ANIMAL_INITIAL_FORM_DATA,
    resolver: zodResolver(animalFormSchema),
  })

  const { reset, handleSubmit: hookFormSubmit } = form

  const { mutateAsync: mutateHandleCreateAnimal } = useMutation({
    mutationFn: createAnimalUseCase.execute,
  })

  const handleCreateAnimal = useCallback(
    async (data: AnimalFormSchema) => {
      try {
        await mutateHandleCreateAnimal({
          propertyId,
          animal: data,
        })
        queryClient.invalidateQueries({
          queryKey: ['animals'],
          exact: false,
        })
        toast.success('Animal foi cadastrado com sucesso')
        reset(ANIMAL_INITIAL_FORM_DATA)
        closeNewAnimalForm()
      } catch {
        toast.error('Erro ao cadastrar animal')
      }
    },
    [
      closeNewAnimalForm,
      mutateHandleCreateAnimal,
      propertyId,
      queryClient,
      reset,
    ]
  )

  return (
    <Sheet.Root open={isOpenNewAnimalForm} onOpenChange={closeNewAnimalForm}>
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>Novo Animal</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para criar um novo animal
          </Sheet.Description>
        </Sheet.Header>

        <Form.Provider {...form}>
          <ScrollArea.Root>
            <form
              id="create-animal-form"
              className="flex flex-col gap-4"
              onSubmit={hookFormSubmit(handleCreateAnimal)}
            >
              <AnimalFormInputs />
            </form>
          </ScrollArea.Root>
        </Form.Provider>

        <Sheet.Footer>
          <Button
            form="create-animal-form"
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

CreateAnimalForm.displayName = 'CreateAnimalForm'
