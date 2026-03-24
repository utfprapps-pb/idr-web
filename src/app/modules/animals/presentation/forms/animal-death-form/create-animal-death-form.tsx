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

import { makeRemoteCreateAnimalDeathUseCase } from '../../../main/factories/use-cases/animal-deaths-use-cases'
import { useAnimalDeathContext } from '../../hooks/animal-death-context.hook'
import {
  animalDeathFormSchema,
  AnimalDeathFormSchema,
} from '../../validations/animal-death-form-schema'

import { AnimalDeathFormInputs } from './animal-death-form-inputs'
import { ANIMAL_DEATH_INITIAL_FORM_DATA } from './animal-death-initial-form-data'

export function CreateAnimalDeathForm() {
  const {
    propertyId,
    animalId,
    isOpenNewAnimalDeathForm,
    closeNewAnimalDeathForm,
  } = useAnimalDeathContext()

  const createAnimalDeathUseCase = makeRemoteCreateAnimalDeathUseCase()

  const queryClient = useQueryClient()

  const form = useHookForm<AnimalDeathFormSchema>({
    defaultValues: ANIMAL_DEATH_INITIAL_FORM_DATA,
    resolver: zodResolver(animalDeathFormSchema),
  })

  const { mutateAsync: mutateHandleCreateAnimalDeath } = useMutation({
    mutationFn: createAnimalDeathUseCase.execute,
  })

  const handleCreateAnimalDeath = useCallback(
    async (data: AnimalDeathFormSchema) => {
      try {
        await mutateHandleCreateAnimalDeath({
          propertyId,
          animalId,
          animalDeath: data,
        })

        queryClient.invalidateQueries({
          queryKey: ['animal-deaths'],
          exact: false,
        })

        toast.success('Óbito do animal foi cadastrado com sucesso')

        form.reset(ANIMAL_DEATH_INITIAL_FORM_DATA)

        closeNewAnimalDeathForm()
      } catch {
        toast.error('Erro ao cadastrar óbito do animal')
      }
    },
    [
      animalId,
      closeNewAnimalDeathForm,
      form,
      mutateHandleCreateAnimalDeath,
      propertyId,
      queryClient,
    ]
  )

  return (
    <Sheet.Root
      open={isOpenNewAnimalDeathForm}
      onOpenChange={closeNewAnimalDeathForm}
    >
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>Novo Óbito</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para criar um novo óbito
          </Sheet.Description>
        </Sheet.Header>

        <Form.Provider {...form}>
          <ScrollArea.Root>
            <form
              id="create-animal-death-form"
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(handleCreateAnimalDeath)}
            >
              <AnimalDeathFormInputs />
            </form>
          </ScrollArea.Root>
        </Form.Provider>

        <Sheet.Footer>
          <Button
            form="create-animal-death-form"
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

CreateAnimalDeathForm.displayName = 'CreateAnimalDeathForm'
