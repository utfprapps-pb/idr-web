import React, { useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { AnimalDataFactory } from '@/main/factories/useCases/animal'
import { Button, Form, Sheet } from '@/presentation/components/ui'
import { useHookForm } from '@/presentation/hooks'

import { useAnimalContext } from '../../hooks/useAnimalContext'

import { AnimalFormInputs } from './animalFormInputs'
import { PROPERTY_DEFAULT_VALUES } from './constants'
import { animalSchema, type AnimalFormData } from './validation'

export const CreateAnimalForm: React.FC = () => {
  const { propertyId, isOpenNewAnimalForm, closeNewAnimalForm } =
    useAnimalContext()

  const createAnimal = AnimalDataFactory.makeRemoteCreateAnimal()

  const queryClient = useQueryClient()

  const form = useHookForm<AnimalFormData>({
    defaultValues: PROPERTY_DEFAULT_VALUES,
    resolver: zodResolver(animalSchema),
  })

  const { reset, handleSubmit: hookFormSubmit } = form

  const { mutateAsync: mutateHandleCreateAnimal } = useMutation({
    mutationFn: createAnimal.execute,
  })

  const handleCreateAnimal = useCallback(
    async (data: AnimalFormData) => {
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
        reset(PROPERTY_DEFAULT_VALUES)
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
      <Sheet.Content className="overflow-y-scroll h-screen" side="right">
        <Sheet.Header>
          <Sheet.Title>Novo Animal</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para criar um novo animal
          </Sheet.Description>
        </Sheet.Header>

        <Form.Provider {...form}>
          <form
            id="create-animal-form"
            className="flex flex-col h-full gap-4"
            onSubmit={hookFormSubmit(handleCreateAnimal)}
          >
            <AnimalFormInputs />
          </form>
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
