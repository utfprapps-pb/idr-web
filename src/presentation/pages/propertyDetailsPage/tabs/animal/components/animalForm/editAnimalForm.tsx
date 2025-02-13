import React, { useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { AnimalDataFactory } from '@/main/factories/useCases/animal'
import { Button, Form, Loading, Sheet } from '@/presentation/components/ui'
import { useHookForm } from '@/presentation/hooks'

import { useAnimal } from '../../hooks/useAnimal'
import { useAnimalContext } from '../../hooks/useAnimalContext'

import { AnimalFormInputs } from './animalFormInputs'
import { PROPERTY_DEFAULT_VALUES } from './constants'
import { animalSchema, type AnimalFormData } from './validation'

export const EditAnimalForm: React.FC = () => {
  const {
    propertyId,
    isOpenEditAnimalForm,
    closeEditAnimalForm,
    selectedAnimal,
  } = useAnimalContext()

  const { isLoading, animal } = useAnimal({
    id: selectedAnimal!.id,
    propertyId,
  })

  const updateAnimal = AnimalDataFactory.makeRemoteUpdateAnimal()

  const queryClient = useQueryClient()

  const form = useHookForm<AnimalFormData>({
    defaultValues: PROPERTY_DEFAULT_VALUES,
    ...(animal && {
      values: {
        ...animal,
      },
    }),
    resolver: zodResolver(animalSchema),
  })

  const { reset, handleSubmit: hookFormSubmit } = form

  const { mutateAsync: mutateHandleUpdateAnimal } = useMutation({
    mutationFn: updateAnimal.execute,
  })

  const handleUpdateAnimal = useCallback(
    async (data: AnimalFormData) => {
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
        reset(PROPERTY_DEFAULT_VALUES)
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
