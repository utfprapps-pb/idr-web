import { useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns'
import toast from 'react-hot-toast'

import {
  Button,
  Form,
  Loading,
  ScrollArea,
  Sheet,
} from '@/core/presentation/components/ui'
import { useHookForm } from '@/core/presentation/hooks'

import { makeRemoteUpdateAnimalMastitisUseCase } from '../../../main/factories/use-cases/animal-mastitides-use-cases'
import { useAnimalMastitisContext } from '../../hooks/animal-mastitis-context.hook'
import { useAnimalMastitisQuery } from '../../hooks/queries/animal-mastitis-query.hook'
import {
  animalMastitisFormSchema,
  type AnimalMastitisFormSchema,
} from '../../validations/animal-mastitis-form-schema'

import { AnimalMastitisFormInputs } from './animal-mastitis-form-inputs'
import { ANIMAL_MASTITIS_INITIAL_FORM_DATA } from './animal-mastitis-initial-data'

export function EditAnimalMastitisForm() {
  const {
    propertyId,
    animalId,
    isOpenEditAnimalMastitisForm,
    closeEditAnimalMastitisForm,
    selectedAnimalMastitis,
  } = useAnimalMastitisContext()

  const { isLoading, animalMastitis } = useAnimalMastitisQuery({
    id: selectedAnimalMastitis!.id,
    propertyId,
    animalId,
  })

  const updateAnimalMastitisUseCase = makeRemoteUpdateAnimalMastitisUseCase()

  const queryClient = useQueryClient()

  const form = useHookForm<AnimalMastitisFormSchema>({
    defaultValues: ANIMAL_MASTITIS_INITIAL_FORM_DATA,
    ...(animalMastitis && {
      values: animalMastitis,
    }),
    resolver: zodResolver(animalMastitisFormSchema),
  })

  const { mutateAsync: mutateHandleUpdateAnimalMastitis } = useMutation({
    mutationFn: updateAnimalMastitisUseCase.execute,
  })

  const handleUpdateAnimalMastitis = useCallback(
    async (data: AnimalMastitisFormSchema) => {
      try {
        if (!selectedAnimalMastitis) {
          toast.error('Erro ao atualizar mastite de animal')
          return
        }

        await mutateHandleUpdateAnimalMastitis({
          animalMastitis: {
            ...data,
            id: selectedAnimalMastitis.id,
          },
          animalId,
          propertyId,
        })
        queryClient.invalidateQueries({
          queryKey: ['animal-mastitides'],
          exact: false,
        })
        toast.success('Mastite foi editada com sucesso')
        form.reset(ANIMAL_MASTITIS_INITIAL_FORM_DATA)
        closeEditAnimalMastitisForm()
      } catch {
        toast.error('Erro ao salvar alterações')
      }
    },
    [
      animalId,
      closeEditAnimalMastitisForm,
      form,
      mutateHandleUpdateAnimalMastitis,
      propertyId,
      queryClient,
      selectedAnimalMastitis,
    ]
  )

  return (
    <Sheet.Root
      open={isOpenEditAnimalMastitisForm}
      onOpenChange={closeEditAnimalMastitisForm}
    >
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>{`Editar Mastite do dia ${selectedAnimalMastitis?.date ? format(selectedAnimalMastitis.date, 'dd/MM/yyyy') : '-'}`}</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para editar a mastite do animal
          </Sheet.Description>
        </Sheet.Header>
        <Form.Provider {...form}>
          <ScrollArea.Root>
            <form
              id="update-animal-mastitis-form"
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(handleUpdateAnimalMastitis)}
            >
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <Loading size="lg" />
                </div>
              ) : (
                <AnimalMastitisFormInputs />
              )}
            </form>
          </ScrollArea.Root>
        </Form.Provider>

        <Sheet.Footer>
          <Button
            type="submit"
            form="update-animal-mastitis-form"
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

EditAnimalMastitisForm.displayName = 'EditAnimalMastitisForm'
