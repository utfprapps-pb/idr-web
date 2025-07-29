import { useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import {
  Button,
  Form,
  Loading,
  ScrollArea,
  Sheet,
} from '@/core/presentation/components/ui'
import { useHookForm } from '@/core/presentation/hooks'

import { makeRemoteUpdateAnimalChildbirthUseCase } from '../../../main/factories/use-cases/animal-childbirths-use-cases'
import { useAnimalChildbirthContext } from '../../hooks/animal-childbirth-context.hook'
import { useAnimalChildbirthQuery } from '../../hooks/queries/animal-childbirth-query.hook'
import {
  animalChildbirthFormSchema,
  type AnimalChildbirthFormSchema,
} from '../../validations/animal-childbirth-form-schema'

import { AnimalChildbirthFormInputs } from './animal-childbirth-form-inputs'
import { ANIMAL_CHILDBIRTH_INITIAL_FORM_DATA } from './animal-childbirth-initial-data'

export function EditAnimalChildbirthForm() {
  const {
    propertyId,
    animalId,
    isOpenEditAnimalChildbirthForm,
    closeEditAnimalChildbirthForm,
    selectedAnimalChildbirth,
  } = useAnimalChildbirthContext()

  const { isLoading, animalChildbirth } = useAnimalChildbirthQuery({
    id: selectedAnimalChildbirth!.id,
    propertyId,
    animalId,
  })

  const updateAnimalChildbirthUseCase =
    makeRemoteUpdateAnimalChildbirthUseCase()

  const queryClient = useQueryClient()

  const form = useHookForm<AnimalChildbirthFormSchema>({
    defaultValues: ANIMAL_CHILDBIRTH_INITIAL_FORM_DATA,
    ...(animalChildbirth && {
      values: {
        ...animalChildbirth,
      },
    }),
    resolver: zodResolver(animalChildbirthFormSchema),
  })

  const { mutateAsync: mutateHandleUpdateAnimalChildbirth } = useMutation({
    mutationFn: updateAnimalChildbirthUseCase.execute,
  })

  const handleUpdateAnimalChildbirth = useCallback(
    async (data: AnimalChildbirthFormSchema) => {
      try {
        if (!selectedAnimalChildbirth) {
          toast.error('Erro ao atualizar parto do animal')
          return
        }

        await mutateHandleUpdateAnimalChildbirth({
          animalChildbirth: {
            ...data,
            id: selectedAnimalChildbirth.id,
          },
          animalId,
          propertyId,
        })
        queryClient.invalidateQueries({
          queryKey: ['animals'],
          exact: false,
        })
        toast.success('Animal foi editado com sucesso')
        form.reset(ANIMAL_CHILDBIRTH_INITIAL_FORM_DATA)
        closeEditAnimalChildbirthForm()
      } catch {
        toast.error('Erro ao salvar alterações')
      }
    },
    [
      animalId,
      closeEditAnimalChildbirthForm,
      form,
      mutateHandleUpdateAnimalChildbirth,
      propertyId,
      queryClient,
      selectedAnimalChildbirth,
    ]
  )

  return (
    <Sheet.Root
      open={isOpenEditAnimalChildbirthForm}
      onOpenChange={closeEditAnimalChildbirthForm}
    >
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>{`Editar Parto do Animal ${selectedAnimalChildbirth?.breed}`}</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para editar o parto do animal
          </Sheet.Description>
        </Sheet.Header>
        <Form.Provider {...form}>
          <ScrollArea.Root>
            <form
              id="update-animal-childbirth-form"
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(handleUpdateAnimalChildbirth)}
            >
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <Loading size="lg" />
                </div>
              ) : (
                <AnimalChildbirthFormInputs />
              )}
            </form>
          </ScrollArea.Root>
        </Form.Provider>

        <Sheet.Footer>
          <Button
            type="submit"
            form="update-animal-childbirth-form"
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

EditAnimalChildbirthForm.displayName = 'EditAnimalChildbirthForm'
