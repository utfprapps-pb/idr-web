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

import { makeRemoteCreateInputUseProductUseCase } from '../../../main/factories/use-cases/input-use-products-use-cases'
import { useInputUseProductContext } from '../../hooks/input-use-product-context.hook'
import {
  inputUseProductFormSchema,
  type InputUseProductFormSchema,
} from '../../validations/input-use-product-form-schema'

import { InputUseProductFormInputs } from './input-use-product-form-inputs'
import { INPUT_USE_PRODUCT_INITIAL_FORM_DATA } from './input-use-product-initial-form-data'

export function CreateInputUseProductForm() {
  const { isOpenNewInputUseProductForm, closeNewInputUseProductForm } =
    useInputUseProductContext()

  const createInputUseProductUseCase = makeRemoteCreateInputUseProductUseCase()

  const queryClient = useQueryClient()

  const form = useHookForm<InputUseProductFormSchema>({
    defaultValues: INPUT_USE_PRODUCT_INITIAL_FORM_DATA,
    resolver: zodResolver(inputUseProductFormSchema),
  })

  const { mutateAsync: mutateHandleCreateInputUseProduct } = useMutation({
    mutationFn: createInputUseProductUseCase.execute,
  })

  const handleCreateInputUseProduct = useCallback(
    async (data: InputUseProductFormSchema) => {
      try {
        await mutateHandleCreateInputUseProduct({
          inputUseProduct: data,
        })

        queryClient.invalidateQueries({
          queryKey: ['input-use-products'],
          exact: false,
        })

        toast.success('Produto criado com sucesso')
        form.reset(INPUT_USE_PRODUCT_INITIAL_FORM_DATA)
        closeNewInputUseProductForm()
      } catch {
        toast.error('Erro ao criar produto')
      }
    },
    [
      closeNewInputUseProductForm,
      form,
      mutateHandleCreateInputUseProduct,
      queryClient,
    ]
  )

  return (
    <Sheet.Root
      open={isOpenNewInputUseProductForm}
      onOpenChange={closeNewInputUseProductForm}
    >
      <Sheet.Content side="right">
        <Sheet.Header>
          <Sheet.Title>Novo Produto</Sheet.Title>
          <Sheet.Description>
            Preencha o formulário para criar um novo produto
          </Sheet.Description>
        </Sheet.Header>
        <Form.Provider {...form}>
          <ScrollArea.Root>
            <form
              id="create-input-use-product-form"
              className="flex flex-col gap-4"
              onSubmit={form.handleSubmit(handleCreateInputUseProduct)}
            >
              <InputUseProductFormInputs />
            </form>
          </ScrollArea.Root>
        </Form.Provider>

        <Sheet.Footer>
          <Button
            type="submit"
            form="create-input-use-product-form"
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

CreateInputUseProductForm.displayName = 'CreateInputUseProductForm'
