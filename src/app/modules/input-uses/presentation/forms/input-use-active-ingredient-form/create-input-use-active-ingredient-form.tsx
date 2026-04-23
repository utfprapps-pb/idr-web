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

import { makeRemoteCreateInputUseActiveIngredientUseCase } from '../../../main/factories/use-cases/input-use-active-ingredients-use-cases'
import { useInputUseActiveIngredientContext } from '../../hooks/input-use-active-ingredient-context.hook'
import {
  inputUseActiveIngredientFormSchema,
  type InputUseActiveIngredientFormSchema,
} from '../../validations/input-use-active-ingredient-form-schema'

import { InputUseActiveIngredientFormInputs } from './input-use-active-ingredient-form-inputs'
import { INPUT_USE_ACTIVE_INGREDIENT_INITIAL_FORM_DATA } from './input-use-active-ingredient-initial-form-data'

export function CreateInputUseActiveIngredientForm() {
  const {
    isOpenNewInputUseActiveIngredientForm,
    closeNewInputUseActiveIngredientForm,
  } = useInputUseActiveIngredientContext()

  const createInputUseActiveIngredientUseCase =
    makeRemoteCreateInputUseActiveIngredientUseCase()

  const queryClient = useQueryClient()

  const form = useHookForm<InputUseActiveIngredientFormSchema>({
    defaultValues: INPUT_USE_ACTIVE_INGREDIENT_INITIAL_FORM_DATA,
    resolver: zodResolver(inputUseActiveIngredientFormSchema),
  })

  const { mutateAsync: mutateHandleCreateInputUseActiveIngredient } =
    useMutation({
      mutationFn: createInputUseActiveIngredientUseCase.execute,
    })

  const handleCreateInputUseActiveIngredient = useCallback(
    async (data: InputUseActiveIngredientFormSchema) => {
      try {
        await mutateHandleCreateInputUseActiveIngredient({
          inputUseActiveIngredient: data,
        })

        queryClient.invalidateQueries({
          queryKey: ['input-use-active-ingredients'],
          exact: false,
        })

        toast.success('Princípio ativo cadastrado com sucesso')

        form.reset(INPUT_USE_ACTIVE_INGREDIENT_INITIAL_FORM_DATA)

        closeNewInputUseActiveIngredientForm()
      } catch {
        toast.error('Erro ao cadastrar princípio ativo')
      }
    },
    [
      closeNewInputUseActiveIngredientForm,
      form,
      mutateHandleCreateInputUseActiveIngredient,
      queryClient,
    ]
  )

  return (
    <Sheet.Root
      open={isOpenNewInputUseActiveIngredientForm}
      onOpenChange={closeNewInputUseActiveIngredientForm}
    >
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>Novo Princípio Ativo</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para criar um novo princípio ativo
          </Sheet.Description>
        </Sheet.Header>

        <Form.Provider {...form}>
          <ScrollArea.Root>
            <form
              id="create-input-use-active-ingredient-form"
              className="flex flex-col px-2 gap-4 mt-4"
              onSubmit={form.handleSubmit(handleCreateInputUseActiveIngredient)}
            >
              <InputUseActiveIngredientFormInputs />
            </form>
          </ScrollArea.Root>
        </Form.Provider>

        <Sheet.Footer className="mt-8">
          <Button
            form="create-input-use-active-ingredient-form"
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

CreateInputUseActiveIngredientForm.displayName =
  'CreateInputUseActiveIngredientForm'
