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

import { makeRemoteCreateAnimalChildbirthUseCase } from '../../../main/factories/use-cases/animal-childbirths-use-cases'
import { useAnimalChildbirthContext } from '../../hooks/animal-childbirth-context.hook'
import {
  animalChildbirthFormSchema,
  AnimalChildbirthFormSchema,
} from '../../validations/animal-childbirth-form-schema'

import { AnimalChildbirthFormInputs } from './animal-childbirth-form-inputs'
import { ANIMAL_CHILDBIRTH_INITIAL_FORM_DATA } from './animal-childbirth-initial-data'

export function CreateAnimalChildbirthForm() {
  const {
    propertyId,
    animalId,
    isOpenNewAnimalChildbirthForm,
    closeNewAnimalChildbirthForm,
  } = useAnimalChildbirthContext()

  const createAnimalChildbirthUseCase =
    makeRemoteCreateAnimalChildbirthUseCase()

  const queryClient = useQueryClient()

  const form = useHookForm<AnimalChildbirthFormSchema>({
    defaultValues: ANIMAL_CHILDBIRTH_INITIAL_FORM_DATA,
    resolver: zodResolver(animalChildbirthFormSchema),
  })

  const { mutateAsync: mutateHandleCreateAnimalChildbirth } = useMutation({
    mutationFn: createAnimalChildbirthUseCase.execute,
  })

  const handleCreateAnimalChildbirth = useCallback(
    async (data: AnimalChildbirthFormSchema) => {
      try {
        await mutateHandleCreateAnimalChildbirth({
          propertyId,
          animalId,
          animalChildbirth: data,
        })

        queryClient.invalidateQueries({
          queryKey: ['animal-childbirths'],
          exact: false,
        })

        toast.success('Parto de animal foi cadastrado com sucesso')

        form.reset(ANIMAL_CHILDBIRTH_INITIAL_FORM_DATA)

        closeNewAnimalChildbirthForm()
      } catch {
        toast.error('Erro ao cadastrar parto de animal')
      }
    },
    [
      animalId,
      closeNewAnimalChildbirthForm,
      form,
      mutateHandleCreateAnimalChildbirth,
      propertyId,
      queryClient,
    ]
  )

  return (
    <Sheet.Root
      open={isOpenNewAnimalChildbirthForm}
      onOpenChange={closeNewAnimalChildbirthForm}
    >
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>Novo Parto</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para criar um novo parto
          </Sheet.Description>
        </Sheet.Header>

        <Form.Provider {...form}>
          <ScrollArea.Root>
            <form
              id="create-animal-childbirth-form"
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(handleCreateAnimalChildbirth)}
            >
              <AnimalChildbirthFormInputs />
            </form>
          </ScrollArea.Root>
        </Form.Provider>

        <Sheet.Footer>
          <Button
            form="create-animal-childbirth-form"
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

CreateAnimalChildbirthForm.displayName = 'CreateAnimalChildbirthForm'
