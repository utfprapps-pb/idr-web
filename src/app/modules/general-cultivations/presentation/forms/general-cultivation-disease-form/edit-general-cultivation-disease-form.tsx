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

import { makeRemoteUpdateGeneralCultivationDiseaseUseCase } from '../../../main/factories/use-cases/general-cultivation-diseases-use-cases'
import { useGeneralCultivationDiseaseContext } from '../../hooks/general-cultivation-disease-context.hook'
import { useGeneralCultivationDiseaseQuery } from '../../hooks/queries/general-cultivation-disease-query.hook'
import {
  generalCultivationDiseaseFormSchema,
  type GeneralCultivationDiseaseFormSchema,
} from '../../validations/general-cultivation-disease-form-schema'

import { GeneralCultivationDiseaseFormInputs } from './general-cultivation-disease-form-inputs'
import { GENERAL_CULTIVATION_DISEASE_INITIAL_FORM_DATA } from './general-cultivation-disease-initial-form-data'

export function EditGeneralCultivationDiseaseForm() {
  const {
    isOpenEditGeneralCultivationDiseaseForm,
    closeEditGeneralCultivationDiseaseForm,
    selectedGeneralCultivationDisease,
  } = useGeneralCultivationDiseaseContext()

  const { isLoading, generalCultivationDisease } =
    useGeneralCultivationDiseaseQuery({
      id: selectedGeneralCultivationDisease!.id,
    })

  const updateGeneralCultivationDiseaseUseCase =
    makeRemoteUpdateGeneralCultivationDiseaseUseCase()

  const queryClient = useQueryClient()

  const form = useHookForm<GeneralCultivationDiseaseFormSchema>({
    defaultValues: GENERAL_CULTIVATION_DISEASE_INITIAL_FORM_DATA,
    ...(generalCultivationDisease && {
      values: {
        ...generalCultivationDisease,
      },
    }),
    resolver: zodResolver(generalCultivationDiseaseFormSchema),
  })

  const { mutateAsync: mutateHandleUpdateGeneralCultivationDisease } =
    useMutation({
      mutationFn: updateGeneralCultivationDiseaseUseCase.execute,
    })

  const handleUpdateGeneralCultivationDisease = useCallback(
    async (data: GeneralCultivationDiseaseFormSchema) => {
      try {
        if (!selectedGeneralCultivationDisease) {
          toast.error('Erro ao atualizar doença de cultivo geral')
          return
        }

        await mutateHandleUpdateGeneralCultivationDisease({
          generalCultivationDisease: {
            ...data,
            id: selectedGeneralCultivationDisease.id,
          },
        })

        queryClient.invalidateQueries({
          queryKey: ['general-cultivation-diseases'],
          exact: false,
        })

        toast.success('Doença de cultivo geral foi editada com sucesso')
        form.reset(GENERAL_CULTIVATION_DISEASE_INITIAL_FORM_DATA)
        closeEditGeneralCultivationDiseaseForm()
      } catch {
        toast.error('Erro ao salvar alterações')
      }
    },
    [
      closeEditGeneralCultivationDiseaseForm,
      form,
      mutateHandleUpdateGeneralCultivationDisease,
      queryClient,
      selectedGeneralCultivationDisease,
    ]
  )

  return (
    <Sheet.Root
      open={isOpenEditGeneralCultivationDiseaseForm}
      onOpenChange={closeEditGeneralCultivationDiseaseForm}
    >
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>
            {`Editar Doença ${selectedGeneralCultivationDisease?.name}`}
          </Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para editar a doença de cultivo geral.
          </Sheet.Description>
        </Sheet.Header>
        <Form.Provider {...form}>
          <ScrollArea.Root>
            <form
              id="update-general-cultivation-disease-form"
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(
                handleUpdateGeneralCultivationDisease
              )}
            >
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <Loading size="lg" />
                </div>
              ) : (
                <GeneralCultivationDiseaseFormInputs />
              )}
            </form>
          </ScrollArea.Root>
        </Form.Provider>

        <Sheet.Footer>
          <Button
            type="submit"
            form="update-general-cultivation-disease-form"
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

EditGeneralCultivationDiseaseForm.displayName =
  'EditGeneralCultivationDiseaseForm'
