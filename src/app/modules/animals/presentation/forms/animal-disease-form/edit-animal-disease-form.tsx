import { useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { Button, Form, Loading, Sheet } from '@/core/presentation/components/ui'
import { useHookForm } from '@/core/presentation/hooks'

import { makeRemoteUpdateAnimalDiseaseUseCase } from '../../../main/factories/use-cases/animal-diseases-use-cases'
import { useAnimalDiseaseContext } from '../../hooks/animal-disease-context.hook'
import { useAnimalDiseaseQuery } from '../../hooks/queries/animal-disease-query.hook'
import {
  animalDiseaseFormSchema,
  type AnimalDiseaseFormSchema,
} from '../../validations/animal-disease-form-schema'

import { AnimalDiseaseFormInputs } from './animal-disease-form-inputs'
import { ANIMAL_DISEASE_INITIAL_FORM_DATA } from './animal-disease-initial-data'

export function EditAnimalDiseaseForm() {
  const {
    propertyId,
    animalId,
    isOpenEditAnimalDiseaseForm,
    closeEditAnimalDiseaseForm,
    selectedAnimalDisease,
  } = useAnimalDiseaseContext()

  const { isLoading, animalDisease } = useAnimalDiseaseQuery({
    id: selectedAnimalDisease!.id,
    propertyId,
    animalId,
  })

  const updateAnimalDiseaseUseCase = makeRemoteUpdateAnimalDiseaseUseCase()

  const queryClient = useQueryClient()

  const form = useHookForm<AnimalDiseaseFormSchema>({
    defaultValues: ANIMAL_DISEASE_INITIAL_FORM_DATA,
    ...(animalDisease && {
      values: {
        ...animalDisease,
      },
    }),
    resolver: zodResolver(animalDiseaseFormSchema),
  })

  const { mutateAsync: mutateHandleUpdateAnimalDisease } = useMutation({
    mutationFn: updateAnimalDiseaseUseCase.execute,
  })

  const handleUpdateAnimalDisease = useCallback(
    async (data: AnimalDiseaseFormSchema) => {
      try {
        if (!selectedAnimalDisease) {
          toast.error('Erro ao atualizar doença do animal')
          return
        }

        await mutateHandleUpdateAnimalDisease({
          animalDisease: {
            ...data,
            id: selectedAnimalDisease.id,
          },
          animalId,
          propertyId,
        })
        queryClient.invalidateQueries({
          queryKey: ['animals'],
          exact: false,
        })
        toast.success('Animal foi editado com sucesso')
        form.reset(ANIMAL_DISEASE_INITIAL_FORM_DATA)
        closeEditAnimalDiseaseForm()
      } catch {
        toast.error('Erro ao salvar alterações')
      }
    },
    [
      animalId,
      closeEditAnimalDiseaseForm,
      form,
      mutateHandleUpdateAnimalDisease,
      propertyId,
      queryClient,
      selectedAnimalDisease,
    ]
  )

  return (
    <Sheet.Root
      open={isOpenEditAnimalDiseaseForm}
      onOpenChange={closeEditAnimalDiseaseForm}
    >
      <Sheet.Content className="overflow-y-scroll h-screen" side="right">
        <Sheet.Header>
          <Sheet.Title>Editar Doença</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para editar a doença do animal
          </Sheet.Description>
        </Sheet.Header>
        <Form.Provider {...form}>
          <form
            id="update-animal-disease-form"
            className="flex flex-col h-full gap-4"
            onSubmit={form.handleSubmit(handleUpdateAnimalDisease)}
          >
            {isLoading ? (
              <div className="flex justify-center h-full items-center">
                <Loading size="lg" />
              </div>
            ) : (
              <AnimalDiseaseFormInputs />
            )}
          </form>
        </Form.Provider>

        <Sheet.Footer>
          <Button
            type="submit"
            form="update-animal-disease-form"
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

EditAnimalDiseaseForm.displayName = 'EditAnimalDiseaseForm'
