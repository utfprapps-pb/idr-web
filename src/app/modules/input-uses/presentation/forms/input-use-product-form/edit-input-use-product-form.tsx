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

import { makeRemoteUpdateInputUseProductUseCase } from '../../../main/factories/use-cases/input-use-products-use-cases'
import { useInputUseProductContext } from '../../hooks/input-use-product-context.hook'
import { useInputUseProductQuery } from '../../hooks/queries/input-use-product-query.hook'
import {
  inputUseProductFormSchema,
  type InputUseProductFormSchema,
} from '../../validations/input-use-product-form-schema'

import { InputUseProductFormInputs } from './input-use-product-form-inputs'
import { INPUT_USE_PRODUCT_INITIAL_FORM_DATA } from './input-use-product-initial-form-data'

export function EditInputUseProductForm() {
  const {
    isOpenEditInputUseProductForm,
    closeEditInputUseProductForm,
    selectedInputUseProduct,
  } = useInputUseProductContext()

  const { isLoading, inputUseProduct } = useInputUseProductQuery({
    id: selectedInputUseProduct!.id,
  })

  const updateInputUseProductUseCase = makeRemoteUpdateInputUseProductUseCase()

  const queryClient = useQueryClient()

  const form = useHookForm<InputUseProductFormSchema>({
    defaultValues: INPUT_USE_PRODUCT_INITIAL_FORM_DATA,
    ...(inputUseProduct && {
      values: {
        ...inputUseProduct,
      },
    }),
    resolver: zodResolver(inputUseProductFormSchema),
  })

  const { mutateAsync: mutateHandleUpdateInputUseProduct } = useMutation({
    mutationFn: updateInputUseProductUseCase.execute,
  })

  const handleUpdateInputUseProduct = useCallback(
    async (data: InputUseProductFormSchema) => {
      try {
        if (!selectedInputUseProduct) {
          toast.error('Erro ao atualizar produto')
          return
        }

        await mutateHandleUpdateInputUseProduct({
          inputUseProduct: {
            ...data,
            id: selectedInputUseProduct.id,
          },
        })

        queryClient.invalidateQueries({
          queryKey: ['input-use-products'],
          exact: false,
        })

        toast.success('Produto editado com sucesso')
        form.reset(INPUT_USE_PRODUCT_INITIAL_FORM_DATA)
        closeEditInputUseProductForm()
      } catch {
        toast.error('Erro ao salvar alterações')
      }
    },
    [
      closeEditInputUseProductForm,
      form,
      mutateHandleUpdateInputUseProduct,
      queryClient,
      selectedInputUseProduct,
    ]
  )

  return (
    <Sheet.Root
      open={isOpenEditInputUseProductForm}
      onOpenChange={closeEditInputUseProductForm}
    >
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>{`Editar Produto ${selectedInputUseProduct?.name}`}</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para editar o produto
          </Sheet.Description>
        </Sheet.Header>
        <Form.Provider {...form}>
          <ScrollArea.Root>
            <form
              id="update-input-use-product-form"
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(handleUpdateInputUseProduct)}
            >
              {isLoading ? (
                <div className="flex justify-center items-center">
                  <Loading size="lg" />
                </div>
              ) : (
                <InputUseProductFormInputs />
              )}
            </form>
          </ScrollArea.Root>
        </Form.Provider>

        <Sheet.Footer>
          <Button
            type="submit"
            form="update-input-use-product-form"
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

EditInputUseProductForm.displayName = 'EditInputUseProductForm'
