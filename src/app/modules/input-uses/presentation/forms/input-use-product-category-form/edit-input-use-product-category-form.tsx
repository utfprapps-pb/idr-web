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

import { makeRemoteUpdateInputUseProductCategoryUseCase } from '../../../main/factories/use-cases/input-use-product-categories-use-cases'
import { useInputUseProductCategoryContext } from '../../hooks/input-use-product-category-context.hook'
import { useInputUseProductCategoryQuery } from '../../hooks/queries/input-use-product-category-query.hook'
import {
  inputUseProductCategoryFormSchema,
  type InputUseProductCategoryFormSchema,
} from '../../validations/input-use-product-category-form-schema'

import { InputUseProductCategoryFormInputs } from './input-use-product-category-form-inputs'
import { INPUT_USE_PRODUCT_CATEGORY_INITIAL_FORM_DATA } from './input-use-product-category-initial-form-data'

export function EditInputUseProductCategoryForm() {
  const {
    isOpenEditInputUseProductCategoryForm,
    closeEditInputUseProductCategoryForm,
    selectedInputUseProductCategory,
  } = useInputUseProductCategoryContext()

  const { isLoading, inputUseProductCategory } =
    useInputUseProductCategoryQuery({
      id: selectedInputUseProductCategory!.id,
    })

  const updateInputUseProductCategoryUseCase =
    makeRemoteUpdateInputUseProductCategoryUseCase()

  const queryClient = useQueryClient()

  const form = useHookForm<InputUseProductCategoryFormSchema>({
    defaultValues: INPUT_USE_PRODUCT_CATEGORY_INITIAL_FORM_DATA,
    ...(inputUseProductCategory && {
      values: {
        ...inputUseProductCategory,
      },
    }),
    resolver: zodResolver(inputUseProductCategoryFormSchema),
  })

  const { mutateAsync: mutateHandleUpdateInputUseProductCategory } =
    useMutation({
      mutationFn: updateInputUseProductCategoryUseCase.execute,
    })

  const handleUpdateInputUseProductCategory = useCallback(
    async (data: InputUseProductCategoryFormSchema) => {
      try {
        if (!selectedInputUseProductCategory?.id) {
          toast.error('Erro ao atualizar categoria de produto')
          return
        }

        await mutateHandleUpdateInputUseProductCategory({
          inputUseProductCategory: {
            ...data,
            id: selectedInputUseProductCategory.id,
          },
        })

        queryClient.invalidateQueries({
          queryKey: ['input-use-product-categories'],
          exact: false,
        })

        toast.success('Categoria de produto foi editado com sucesso')
        form.reset(INPUT_USE_PRODUCT_CATEGORY_INITIAL_FORM_DATA)
        closeEditInputUseProductCategoryForm()
      } catch {
        toast.error('Erro ao salvar alterações')
      }
    },
    [
      closeEditInputUseProductCategoryForm,
      form,
      mutateHandleUpdateInputUseProductCategory,
      queryClient,
      selectedInputUseProductCategory,
    ]
  )

  return (
    <Sheet.Root
      open={isOpenEditInputUseProductCategoryForm}
      onOpenChange={closeEditInputUseProductCategoryForm}
    >
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>Editar Categoria de Produto</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para editar o categoria de produto
          </Sheet.Description>
        </Sheet.Header>
        <Form.Provider {...form}>
          <ScrollArea.Root>
            <form
              id="update-input-use-product-category-form"
              className="flex flex-col px-2 gap-4 mt-4"
              onSubmit={form.handleSubmit(handleUpdateInputUseProductCategory)}
            >
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <Loading size="lg" />
                </div>
              ) : (
                <InputUseProductCategoryFormInputs />
              )}
            </form>
          </ScrollArea.Root>
        </Form.Provider>

        <Sheet.Footer className="mt-8">
          <Button
            type="submit"
            form="update-input-use-product-category-form"
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

EditInputUseProductCategoryForm.displayName = 'EditInputUseProductCategoryForm'
