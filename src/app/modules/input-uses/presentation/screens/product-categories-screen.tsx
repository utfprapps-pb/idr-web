import { Button, Input } from '@/core/presentation/components/ui'

import { ProductCategoryDataTable } from '../components/product-category-data-table'
import { ProductCategoryDeleteDialog } from '../components/product-category-delete-dialog'
import {
  ProductCategoryContext,
  ProductCategoryProvider,
} from '../contexts/product-category-context'
import { ProductCategoryForm } from '../forms/product-category-form'

export function ProductCategoriesScreen() {
  return (
    <ProductCategoryProvider>
      <ProductCategoryContext.Consumer>
        {({
          selectedProductCategory,
          isOpenDeleteProductCategoryContainer,
          isOpenNewProductCategoryForm,
          isOpenEditProductCategoryForm,
          filters,
          handleChangeFilters,
          openNewProductCategoryForm,
        }) => (
          <section className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2">
              <Button
                type="button"
                variant="default"
                className="self-end"
                onClick={openNewProductCategoryForm}
              >
                Adicionar Categoria de Produto
              </Button>

              <Input
                className="w-fit"
                value={filters.name?.value ?? ''}
                onChange={({ target }) => {
                  handleChangeFilters({
                    name: { value: target.value, type: 'LIKE' },
                  })
                }}
                placeholder="Procurar categoria por nome"
              />
            </div>

            <ProductCategoryDataTable />

            {selectedProductCategory &&
              isOpenDeleteProductCategoryContainer && (
                <ProductCategoryDeleteDialog />
              )}

            {(isOpenNewProductCategoryForm ||
              isOpenEditProductCategoryForm) && (
              <ProductCategoryForm id={selectedProductCategory?.id} />
            )}
          </section>
        )}
      </ProductCategoryContext.Consumer>
    </ProductCategoryProvider>
  )
}

ProductCategoriesScreen.displayName = 'ProductCategoriesScreen'
