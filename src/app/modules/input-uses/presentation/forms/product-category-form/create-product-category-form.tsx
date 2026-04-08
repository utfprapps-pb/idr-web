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

import { makeRemoteCreateProductCategoryUseCase } from '../../../main/factories/use-cases/product-categories-use-cases'
import { useProductCategoryContext } from '../../hooks/product-category-context.hook'
import {
  productCategoryFormSchema,
  type ProductCategoryFormSchema,
} from '../../validations/product-category-form-schema'

import { ProductCategoryFormInputs } from './product-category-form-inputs'
import { PRODUCT_CATEGORY_INITIAL_FORM_DATA } from './product-category-initial-form-data'

export function CreateProductCategoryForm() {
  const { isOpenNewProductCategoryForm, closeNewProductCategoryForm } =
    useProductCategoryContext()

  const createProductCategoryUseCase = makeRemoteCreateProductCategoryUseCase()

  const queryClient = useQueryClient()

  const form = useHookForm<ProductCategoryFormSchema>({
    defaultValues: PRODUCT_CATEGORY_INITIAL_FORM_DATA,
    resolver: zodResolver(productCategoryFormSchema),
  })

  const { mutateAsync: mutateHandleCreateProductCategory } = useMutation({
    mutationFn: createProductCategoryUseCase.execute,
  })

  const handleCreateProductCategory = useCallback(
    async (data: ProductCategoryFormSchema) => {
      try {
        await mutateHandleCreateProductCategory({
          productCategory: data,
        })

        queryClient.invalidateQueries({
          queryKey: ['product-categories'],
          exact: false,
        })

        toast.success('Categoria de produto cadastrado com sucesso')

        form.reset(PRODUCT_CATEGORY_INITIAL_FORM_DATA)

        closeNewProductCategoryForm()
      } catch {
        toast.error('Erro ao cadastrar categoria de produto')
      }
    },
    [
      closeNewProductCategoryForm,
      form,
      mutateHandleCreateProductCategory,
      queryClient,
    ]
  )

  return (
    <Sheet.Root
      open={isOpenNewProductCategoryForm}
      onOpenChange={closeNewProductCategoryForm}
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
              id="create-product-category-form"
              className="flex flex-col px-2 gap-4 mt-4"
              onSubmit={form.handleSubmit(handleCreateProductCategory)}
            >
              <ProductCategoryFormInputs />
            </form>
          </ScrollArea.Root>
        </Form.Provider>

        <Sheet.Footer className="mt-8">
          <Button
            form="create-product-category-form"
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

CreateProductCategoryForm.displayName = 'CreateProductCategoryForm'
