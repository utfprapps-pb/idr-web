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

import { makeRemoteCreateAnimalInseminationUseCase } from '../../../main/factories/use-cases/animal-inseminations-use-cases'
import { useAnimalInseminationContext } from '../../hooks/animal-insemination-context.hook'
import {
  animalInseminationFormSchema,
  AnimalInseminationFormSchema,
} from '../../validations/animal-insemination-form-schema'

import { AnimalInseminationFormInputs } from './animal-insemination-form-inputs'
import { ANIMAL_INSEMINATION_INITIAL_FORM_DATA } from './animal-insemination-initial-data'

export function CreateAnimalInseminationForm() {
  const {
    propertyId,
    animalId,
    isOpenNewAnimalInseminationForm,
    closeNewAnimalInseminationForm,
  } = useAnimalInseminationContext()

  const createAnimalInseminationUseCase =
    makeRemoteCreateAnimalInseminationUseCase()

  const queryClient = useQueryClient()

  const form = useHookForm<AnimalInseminationFormSchema>({
    defaultValues: ANIMAL_INSEMINATION_INITIAL_FORM_DATA,
    resolver: zodResolver(animalInseminationFormSchema),
  })

  const { mutateAsync: mutateHandleCreateAnimalInsemination } = useMutation({
    mutationFn: createAnimalInseminationUseCase.execute,
  })

  const handleCreateAnimalInsemination = useCallback(
    async (data: AnimalInseminationFormSchema) => {
      try {
        await mutateHandleCreateAnimalInsemination({
          propertyId,
          animalId,
          animalInsemination: data,
        })

        queryClient.invalidateQueries({
          queryKey: ['animal-inseminations'],
          exact: false,
        })

        toast.success('Inseminação Artificial foi cadastrada com sucesso')

        form.reset(ANIMAL_INSEMINATION_INITIAL_FORM_DATA)

        closeNewAnimalInseminationForm()
      } catch {
        toast.error('Erro ao cadastrar inseminação artificial')
      }
    },
    [
      animalId,
      closeNewAnimalInseminationForm,
      form,
      mutateHandleCreateAnimalInsemination,
      propertyId,
      queryClient,
    ]
  )

  return (
    <Sheet.Root
      open={isOpenNewAnimalInseminationForm}
      onOpenChange={closeNewAnimalInseminationForm}
    >
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>Novo Inseminação Artificial</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para criar uma nova inseminação artificial
          </Sheet.Description>
        </Sheet.Header>

        <Form.Provider {...form}>
          <ScrollArea.Root>
            <form
              id="create-animal-insemination-form"
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(handleCreateAnimalInsemination)}
            >
              <AnimalInseminationFormInputs />
            </form>
          </ScrollArea.Root>
        </Form.Provider>

        <Sheet.Footer>
          <Button
            form="create-animal-insemination-form"
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

CreateAnimalInseminationForm.displayName = 'CreateAnimalInseminationForm'
