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

import { makeRemoteUpdateInputUseActiveIngredientUseCase } from '../../../main/factories/use-cases/input-use-active-ingredients-use-cases'
import { useInputUseActiveIngredientContext } from '../../hooks/input-use-active-ingredient-context.hook'
import { useInputUseActiveIngredientQuery } from '../../hooks/queries/input-use-active-ingredient-query.hook'
import {
  inputUseActiveIngredientFormSchema,
  type InputUseActiveIngredientFormSchema,
} from '../../validations/input-use-active-ingredient-form-schema'

import { InputUseActiveIngredientFormInputs } from './input-use-active-ingredient-form-inputs'
import { INPUT_USE_ACTIVE_INGREDIENT_INITIAL_FORM_DATA } from './input-use-active-ingredient-initial-form-data'

export function EditInputUseActiveIngredientForm() {
  const {
    isOpenEditInputUseActiveIngredientForm,
    closeEditInputUseActiveIngredientForm,
    selectedInputUseActiveIngredient,
  } = useInputUseActiveIngredientContext()

  const { isLoading, inputUseActiveIngredient } =
    useInputUseActiveIngredientQuery({
      id: selectedInputUseActiveIngredient!.id,
    })

  const updateInputUseActiveIngredientUseCase =
    makeRemoteUpdateInputUseActiveIngredientUseCase()

  const queryClient = useQueryClient()

  const form = useHookForm<InputUseActiveIngredientFormSchema>({
    defaultValues: INPUT_USE_ACTIVE_INGREDIENT_INITIAL_FORM_DATA,
    ...(inputUseActiveIngredient && {
      values: {
        ...inputUseActiveIngredient,
      },
    }),
    resolver: zodResolver(inputUseActiveIngredientFormSchema),
  })

  const { mutateAsync: mutateHandleUpdateInputUseActiveIngredient } =
    useMutation({
      mutationFn: updateInputUseActiveIngredientUseCase.execute,
    })

  const handleUpdateInputUseActiveIngredient = useCallback(
    async (data: InputUseActiveIngredientFormSchema) => {
      try {
        if (!selectedInputUseActiveIngredient?.id) {
          toast.error('Erro ao atualizar princípio ativo')
          return
        }

        await mutateHandleUpdateInputUseActiveIngredient({
          inputUseActiveIngredient: {
            ...data,
            id: selectedInputUseActiveIngredient.id,
          },
        })

        queryClient.invalidateQueries({
          queryKey: ['input-use-active-ingredients'],
          exact: false,
        })

        toast.success('Princípio ativo foi editado com sucesso')
        form.reset(INPUT_USE_ACTIVE_INGREDIENT_INITIAL_FORM_DATA)
        closeEditInputUseActiveIngredientForm()
      } catch {
        toast.error('Erro ao salvar alterações')
      }
    },
    [
      closeEditInputUseActiveIngredientForm,
      form,
      mutateHandleUpdateInputUseActiveIngredient,
      queryClient,
      selectedInputUseActiveIngredient,
    ]
  )

  return (
    <Sheet.Root
      open={isOpenEditInputUseActiveIngredientForm}
      onOpenChange={closeEditInputUseActiveIngredientForm}
    >
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>{`Editar Princípio Ativo ${selectedInputUseActiveIngredient?.name}`}</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para editar o princípio ativo
          </Sheet.Description>
        </Sheet.Header>
        <Form.Provider {...form}>
          <ScrollArea.Root>
            <form
              id="update-input-use-active-ingredient-form"
              className="flex flex-col px-2 gap-4 mt-4"
              onSubmit={form.handleSubmit(handleUpdateInputUseActiveIngredient)}
            >
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <Loading size="lg" />
                </div>
              ) : (
                <InputUseActiveIngredientFormInputs />
              )}
            </form>
          </ScrollArea.Root>
        </Form.Provider>

        <Sheet.Footer className="mt-8">
          <Button
            type="submit"
            form="update-input-use-active-ingredient-form"
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

EditInputUseActiveIngredientForm.displayName =
  'EditInputUseActiveIngredientForm'
