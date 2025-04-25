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

import { makeRemoteCreateAnimalHeiferCalfStageUseCase } from '../../../main/factories/use-cases/animal-heifer-calf-stages-use-cases'
import { useAnimalHeiferCalfStageContext } from '../../hooks/animal-heifer-calf-stage-context.hook'
import {
  animalHeiferCalfStageFormSchema,
  AnimalHeiferCalfStageFormSchema,
} from '../../validations/animal-heifer-calf-stage-form-schema'

import { AnimalHeiferCalfStageFormInputs } from './animal-heifer-calf-stage-form-inputs'
import { ANIMAL_HEIFER_CALF_STAGE_INITIAL_FORM_DATA } from './animal-heifer-calf-stage-initial-data'

export function CreateAnimalHeiferCalfStageForm() {
  const {
    propertyId,
    animalId,
    isOpenNewAnimalHeiferCalfStageForm,
    closeNewAnimalHeiferCalfStageForm,
  } = useAnimalHeiferCalfStageContext()

  const createAnimalHeiferCalfStageUseCase =
    makeRemoteCreateAnimalHeiferCalfStageUseCase()

  const queryClient = useQueryClient()

  const form = useHookForm<AnimalHeiferCalfStageFormSchema>({
    defaultValues: ANIMAL_HEIFER_CALF_STAGE_INITIAL_FORM_DATA,
    resolver: zodResolver(animalHeiferCalfStageFormSchema),
  })

  const { mutateAsync: mutateHandleCreateAnimalHeiferCalfStage } = useMutation({
    mutationFn: createAnimalHeiferCalfStageUseCase.execute,
  })

  const handleCreateAnimalHeiferCalfStage = useCallback(
    async (data: AnimalHeiferCalfStageFormSchema) => {
      try {
        await mutateHandleCreateAnimalHeiferCalfStage({
          propertyId,
          animalId,
          animalHeiferCalfStage: data,
        })

        queryClient.invalidateQueries({
          queryKey: ['animal-heifer-calf-stages'],
          exact: false,
        })

        toast.success('Fase bezerra novilha foi cadastrado com sucesso')

        form.reset(ANIMAL_HEIFER_CALF_STAGE_INITIAL_FORM_DATA)

        closeNewAnimalHeiferCalfStageForm()
      } catch {
        toast.error('Erro ao cadastrar fase bezerra novilha')
      }
    },
    [
      animalId,
      closeNewAnimalHeiferCalfStageForm,
      form,
      mutateHandleCreateAnimalHeiferCalfStage,
      propertyId,
      queryClient,
    ]
  )

  return (
    <Sheet.Root
      open={isOpenNewAnimalHeiferCalfStageForm}
      onOpenChange={closeNewAnimalHeiferCalfStageForm}
    >
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>Nova Fase Bezerra Novilha</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para criar uma nova faze bezerra novilha
          </Sheet.Description>
        </Sheet.Header>

        <Form.Provider {...form}>
          <ScrollArea.Root>
            <form
              id="create-animal-heifer-calf-stage-form"
              className="flex flex-col px-2 gap-4"
              onSubmit={form.handleSubmit(handleCreateAnimalHeiferCalfStage)}
            >
              <AnimalHeiferCalfStageFormInputs />
            </form>
          </ScrollArea.Root>
        </Form.Provider>

        <Sheet.Footer>
          <Button
            form="create-animal-heifer-calf-stage-form"
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

CreateAnimalHeiferCalfStageForm.displayName = 'CreateAnimalHeiferCalfStageForm'
