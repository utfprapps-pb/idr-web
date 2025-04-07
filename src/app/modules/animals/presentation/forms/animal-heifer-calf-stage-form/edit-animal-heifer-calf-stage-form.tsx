import { useCallback } from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

import { Button, Form, Loading, Sheet } from '@/core/presentation/components/ui'
import { useHookForm } from '@/core/presentation/hooks'

import { makeRemoteUpdateAnimalHeiferCalfStageUseCase } from '../../../main/factories/use-cases/animal-heifer-calf-stages-use-cases'
import { useAnimalHeiferCalfStageContext } from '../../hooks/animal-heifer-calf-stage-context.hook'
import { useAnimalHeiferCalfStageQuery } from '../../hooks/queries/animal-heifer-calf-stage-query.hook'
import {
  animalHeiferCalfStageFormSchema,
  type AnimalHeiferCalfStageFormSchema,
} from '../../validations/animal-heifer-calf-stage-form-schema'

import { AnimalHeiferCalfStageFormInputs } from './animal-heifer-calf-stage-form-inputs'
import { ANIMAL_HEIFER_CALF_STAGE_INITIAL_FORM_DATA } from './animal-heifer-calf-stage-initial-data'

export function EditAnimalHeiferCalfStageForm() {
  const {
    propertyId,
    animalId,
    isOpenEditAnimalHeiferCalfStageForm,
    closeEditAnimalHeiferCalfStageForm,
    selectedAnimalHeiferCalfStage,
  } = useAnimalHeiferCalfStageContext()

  const { isLoading, animalHeiferCalfStage } = useAnimalHeiferCalfStageQuery({
    id: selectedAnimalHeiferCalfStage!.id,
    propertyId,
    animalId,
  })

  const updateAnimalHeiferCalfStageUseCase =
    makeRemoteUpdateAnimalHeiferCalfStageUseCase()

  const queryClient = useQueryClient()

  const form = useHookForm<AnimalHeiferCalfStageFormSchema>({
    defaultValues: ANIMAL_HEIFER_CALF_STAGE_INITIAL_FORM_DATA,
    ...(animalHeiferCalfStage && {
      values: {
        ...animalHeiferCalfStage,
      },
    }),
    resolver: zodResolver(animalHeiferCalfStageFormSchema),
  })

  const { mutateAsync: mutateHandleUpdateAnimalHeiferCalfStage } = useMutation({
    mutationFn: updateAnimalHeiferCalfStageUseCase.execute,
  })

  const handleUpdateAnimalHeiferCalfStage = useCallback(
    async (data: AnimalHeiferCalfStageFormSchema) => {
      try {
        if (!selectedAnimalHeiferCalfStage) {
          toast.error('Erro ao atualizar fase bezerra novilha')
          return
        }

        await mutateHandleUpdateAnimalHeiferCalfStage({
          animalHeiferCalfStage: {
            ...data,
            id: selectedAnimalHeiferCalfStage.id,
          },
          animalId,
          propertyId,
        })
        queryClient.invalidateQueries({
          queryKey: ['animals'],
          exact: false,
        })
        toast.success('Animal foi editado com sucesso')
        form.reset(ANIMAL_HEIFER_CALF_STAGE_INITIAL_FORM_DATA)
        closeEditAnimalHeiferCalfStageForm()
      } catch {
        toast.error('Erro ao salvar alterações')
      }
    },
    [
      animalId,
      closeEditAnimalHeiferCalfStageForm,
      form,
      mutateHandleUpdateAnimalHeiferCalfStage,
      propertyId,
      queryClient,
      selectedAnimalHeiferCalfStage,
    ]
  )

  return (
    <Sheet.Root
      open={isOpenEditAnimalHeiferCalfStageForm}
      onOpenChange={closeEditAnimalHeiferCalfStageForm}
    >
      <Sheet.Content className="overflow-y-scroll h-screen" side="right">
        <Sheet.Header>
          <Sheet.Title>{`Editar Fase bezerra novilha com pesagem no dia ${selectedAnimalHeiferCalfStage?.weighingDate}`}</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para editar o parto do animal
          </Sheet.Description>
        </Sheet.Header>
        <Form.Provider {...form}>
          <form
            id="update-animal-heifer-calf-stage-form"
            className="flex flex-col h-full gap-4"
            onSubmit={form.handleSubmit(handleUpdateAnimalHeiferCalfStage)}
          >
            {isLoading ? (
              <div className="flex justify-center h-full items-center">
                <Loading size="lg" />
              </div>
            ) : (
              <AnimalHeiferCalfStageFormInputs />
            )}
          </form>
        </Form.Provider>

        <Sheet.Footer>
          <Button
            type="submit"
            form="update-animal-heifer-calf-stage-form"
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

EditAnimalHeiferCalfStageForm.displayName = 'EditAnimalHeiferCalfStageForm'
