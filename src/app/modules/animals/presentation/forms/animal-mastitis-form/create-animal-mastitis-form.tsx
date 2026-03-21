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

import { makeRemoteCreateAnimalMastitisUseCase } from '../../../main/factories/use-cases/animal-mastitides-use-cases'
import { useAnimalMastitisContext } from '../../hooks/animal-mastitis-context.hook'
import {
  animalMastitisFormSchema,
  AnimalMastitisFormSchema,
} from '../../validations/animal-mastitis-form-schema'

import { AnimalMastitisFormInputs } from './animal-mastitis-form-inputs'
import { ANIMAL_MASTITIS_INITIAL_FORM_DATA } from './animal-mastitis-initial-form-data'

export function CreateAnimalMastitisForm() {
  const {
    propertyId,
    animalId,
    isOpenNewAnimalMastitisForm,
    closeNewAnimalMastitisForm,
  } = useAnimalMastitisContext()

  const createAnimalMastitisUseCase = makeRemoteCreateAnimalMastitisUseCase()

  const queryClient = useQueryClient()

  const form = useHookForm<AnimalMastitisFormSchema>({
    defaultValues: ANIMAL_MASTITIS_INITIAL_FORM_DATA,
    resolver: zodResolver(animalMastitisFormSchema),
  })

  const { mutateAsync: mutateHandleCreateAnimalMastitis } = useMutation({
    mutationFn: createAnimalMastitisUseCase.execute,
  })

  const handleCreateAnimalMastitis = useCallback(
    async (data: AnimalMastitisFormSchema) => {
      try {
        await mutateHandleCreateAnimalMastitis({
          propertyId,
          animalId,
          animalMastitis: data,
        })

        queryClient.invalidateQueries({
          queryKey: ['animal-mastitides'],
          exact: false,
        })

        toast.success('Mastite de animal foi cadastrada com sucesso')

        form.reset(ANIMAL_MASTITIS_INITIAL_FORM_DATA)

        closeNewAnimalMastitisForm()
      } catch {
        toast.error('Erro ao cadastrar mastite de animal')
      }
    },
    [
      animalId,
      closeNewAnimalMastitisForm,
      form,
      mutateHandleCreateAnimalMastitis,
      propertyId,
      queryClient,
    ]
  )

  return (
    <Sheet.Root
      open={isOpenNewAnimalMastitisForm}
      onOpenChange={closeNewAnimalMastitisForm}
    >
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>Nova Mastite</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para criar uma nova mastite
          </Sheet.Description>
        </Sheet.Header>

        <Form.Provider {...form}>
          <ScrollArea.Root>
            <form
              id="create-animal-mastitis-form"
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(handleCreateAnimalMastitis)}
            >
              <AnimalMastitisFormInputs />
            </form>
          </ScrollArea.Root>
        </Form.Provider>

        <Sheet.Footer>
          <Button
            form="create-animal-mastitis-form"
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

CreateAnimalMastitisForm.displayName = 'CreateAnimalMastitisForm'
