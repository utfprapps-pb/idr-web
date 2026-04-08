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

import { makeRemoteCreateInputUseProductCategoryUseCase } from '../../../main/factories/use-cases/input-use-product-categories-use-cases'
import { useInputUseProductCategoryContext } from '../../hooks/input-use-product-category-context.hook'
import {
  inputUseProductCategoryFormSchema,
  type InputUseProductCategoryFormSchema,
} from '../../validations/input-use-product-category-form-schema'

import { InputUseProductCategoryFormInputs } from './input-use-product-category-form-inputs'
import { INPUT_USE_PRODUCT_CATEGORY_INITIAL_FORM_DATA } from './input-use-product-category-initial-form-data'

export function CreateInputUseProductCategoryForm() {
  const {
    isOpenNewInputUseProductCategoryForm,
    closeNewInputUseProductCategoryForm,
  } = useInputUseProductCategoryContext()

  const createInputUseProductCategoryUseCase =
    makeRemoteCreateInputUseProductCategoryUseCase()

  const queryClient = useQueryClient()

  const form = useHookForm<InputUseProductCategoryFormSchema>({
    defaultValues: INPUT_USE_PRODUCT_CATEGORY_INITIAL_FORM_DATA,
    resolver: zodResolver(inputUseProductCategoryFormSchema),
  })

  const { mutateAsync: mutateHandleCreateInputUseProductCategory } =
    useMutation({
      mutationFn: createInputUseProductCategoryUseCase.execute,
    })

  const handleCreateInputUseProductCategory = useCallback(
    async (data: InputUseProductCategoryFormSchema) => {
      try {
        await mutateHandleCreateInputUseProductCategory({
          inputUseProductCategory: data,
        })

        queryClient.invalidateQueries({
          queryKey: ['input-use-product-categories'],
          exact: false,
        })

        toast.success('Categoria de produto cadastrado com sucesso')

        form.reset(INPUT_USE_PRODUCT_CATEGORY_INITIAL_FORM_DATA)

        closeNewInputUseProductCategoryForm()
      } catch {
        toast.error('Erro ao cadastrar categoria de produto')
      }
    },
    [
      closeNewInputUseProductCategoryForm,
      form,
      mutateHandleCreateInputUseProductCategory,
      queryClient,
    ]
  )

  return (
    <Sheet.Root
      open={isOpenNewInputUseProductCategoryForm}
      onOpenChange={closeNewInputUseProductCategoryForm}
    >
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>Novo Categoria de Produto</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para criar um novo categoria de produto
          </Sheet.Description>
        </Sheet.Header>

        <Form.Provider {...form}>
          <ScrollArea.Root>
            <form
              id="create-input-use-product-category-form"
              className="flex flex-col px-2 gap-4 mt-4"
              onSubmit={form.handleSubmit(handleCreateInputUseProductCategory)}
            >
              <InputUseProductCategoryFormInputs />
            </form>
          </ScrollArea.Root>
        </Form.Provider>

        <Sheet.Footer className="mt-8">
          <Button
            form="create-input-use-product-category-form"
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

CreateInputUseProductCategoryForm.displayName =
  'CreateInputUseProductCategoryForm'
