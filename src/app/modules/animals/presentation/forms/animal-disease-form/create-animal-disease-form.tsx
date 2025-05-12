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

import { makeRemoteCreateAnimalDiseaseUseCase } from '../../../main/factories/use-cases/animal-diseases-use-cases'
import { useAnimalDiseaseContext } from '../../hooks/animal-disease-context.hook'
import {
  animalDiseaseFormSchema,
  AnimalDiseaseFormSchema,
} from '../../validations/animal-disease-form-schema'

import { AnimalDiseaseFormInputs } from './animal-disease-form-inputs'
import { ANIMAL_DISEASE_INITIAL_FORM_DATA } from './animal-disease-initial-data'

export function CreateAnimalDiseaseForm() {
  const {
    propertyId,
    animalId,
    isOpenNewAnimalDiseaseForm,
    closeNewAnimalDiseaseForm,
  } = useAnimalDiseaseContext()

  const createAnimalDiseaseUseCase = makeRemoteCreateAnimalDiseaseUseCase()

  const queryClient = useQueryClient()

  const form = useHookForm<AnimalDiseaseFormSchema>({
    defaultValues: ANIMAL_DISEASE_INITIAL_FORM_DATA,
    resolver: zodResolver(animalDiseaseFormSchema),
  })

  const { mutateAsync: mutateHandleCreateAnimalDisease } = useMutation({
    mutationFn: createAnimalDiseaseUseCase.execute,
  })

  const handleCreateAnimalDisease = useCallback(
    async (data: AnimalDiseaseFormSchema) => {
      try {
        await mutateHandleCreateAnimalDisease({
          propertyId,
          animalId,
          animalDisease: data,
        })

        queryClient.invalidateQueries({
          queryKey: ['animal-diseases'],
          exact: false,
        })

        toast.success('Doença de animal foi cadastrado com sucesso')

        form.reset(ANIMAL_DISEASE_INITIAL_FORM_DATA)

        closeNewAnimalDiseaseForm()
      } catch {
        toast.error('Erro ao cadastrar doença de animal')
      }
    },
    [
      animalId,
      closeNewAnimalDiseaseForm,
      form,
      mutateHandleCreateAnimalDisease,
      propertyId,
      queryClient,
    ]
  )

  return (
    <Sheet.Root
      open={isOpenNewAnimalDiseaseForm}
      onOpenChange={closeNewAnimalDiseaseForm}
    >
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>Nova Doença</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para criar uma nova doença
          </Sheet.Description>
        </Sheet.Header>

        <Form.Provider {...form}>
          <ScrollArea.Root>
            <form
              id="create-animal-disease-form"
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(handleCreateAnimalDisease)}
            >
              <AnimalDiseaseFormInputs />
            </form>
          </ScrollArea.Root>
        </Form.Provider>

        <Sheet.Footer>
          <Button
            form="create-animal-disease-form"
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

CreateAnimalDiseaseForm.displayName = 'CreateAnimalDiseaseForm'
