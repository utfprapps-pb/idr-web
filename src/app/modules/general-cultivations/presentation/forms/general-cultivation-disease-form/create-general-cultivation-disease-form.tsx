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

import { makeRemoteCreateGeneralCultivationDiseaseUseCase } from '../../../main/factories/use-cases/general-cultivation-diseases-use-cases'
import { useGeneralCultivationDiseaseContext } from '../../hooks/general-cultivation-disease-context.hook'
import {
  generalCultivationDiseaseFormSchema,
  type GeneralCultivationDiseaseFormSchema,
} from '../../validations/general-cultivation-disease-form-schema'

import { GeneralCultivationDiseaseFormInputs } from './general-cultivation-disease-form-inputs'
import { GENERAL_CULTIVATION_DISEASE_INITIAL_FORM_DATA } from './general-cultivation-disease-initial-form-data'

export function CreateGeneralCultivationDiseaseForm() {
  const {
    isOpenNewGeneralCultivationDiseaseForm,
    closeNewGeneralCultivationDiseaseForm,
  } = useGeneralCultivationDiseaseContext()

  const createGeneralCultivationDiseaseUseCase =
    makeRemoteCreateGeneralCultivationDiseaseUseCase()

  const queryClient = useQueryClient()

  const form = useHookForm<GeneralCultivationDiseaseFormSchema>({
    defaultValues: GENERAL_CULTIVATION_DISEASE_INITIAL_FORM_DATA,
    resolver: zodResolver(generalCultivationDiseaseFormSchema),
  })

  const { mutateAsync: mutateHandleCreateGeneralCultivationDisease } =
    useMutation({
      mutationFn: createGeneralCultivationDiseaseUseCase.execute,
    })

  const handleCreateGeneralCultivationDisease = useCallback(
    async (data: GeneralCultivationDiseaseFormSchema) => {
      try {
        await mutateHandleCreateGeneralCultivationDisease({
          generalCultivationDisease: data,
        })

        queryClient.invalidateQueries({
          queryKey: ['general-cultivation-diseases'],
          exact: false,
        })

        toast.success('Doença de cultivo geral foi cadastrada com sucesso')
        form.reset(GENERAL_CULTIVATION_DISEASE_INITIAL_FORM_DATA)
        closeNewGeneralCultivationDiseaseForm()
      } catch {
        toast.error('Erro ao cadastrar doença de cultivo geral')
      }
    },
    [
      closeNewGeneralCultivationDiseaseForm,
      form,
      mutateHandleCreateGeneralCultivationDisease,
      queryClient,
    ]
  )

  return (
    <Sheet.Root
      open={isOpenNewGeneralCultivationDiseaseForm}
      onOpenChange={closeNewGeneralCultivationDiseaseForm}
    >
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>Nova Doença</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para criar uma nova doença de cultivo geral.
          </Sheet.Description>
        </Sheet.Header>

        <Form.Provider {...form}>
          <ScrollArea.Root>
            <form
              id="create-general-cultivation-disease-form"
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(
                handleCreateGeneralCultivationDisease
              )}
            >
              <GeneralCultivationDiseaseFormInputs />
            </form>
          </ScrollArea.Root>
        </Form.Provider>

        <Sheet.Footer>
          <Button
            form="create-general-cultivation-disease-form"
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

CreateGeneralCultivationDiseaseForm.displayName =
  'CreateGeneralCultivationDiseaseForm'
