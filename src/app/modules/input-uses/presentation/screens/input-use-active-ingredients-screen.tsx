import { Button, Input } from '@/core/presentation/components/ui'

import { InputUseActiveIngredientDataTable } from '../components/input-use-active-ingredient-data-table'
import { InputUseActiveIngredientDeleteDialog } from '../components/input-use-active-ingredient-delete-dialog'
import {
  InputUseActiveIngredientContext,
  InputUseActiveIngredientProvider,
} from '../contexts/input-use-active-ingredient-context'
import { InputUseActiveIngredientForm } from '../forms/input-use-active-ingredient-form'

export function InputUseActiveIngredientsScreen() {
  return (
    <InputUseActiveIngredientProvider>
      <InputUseActiveIngredientContext.Consumer>
        {({
          selectedInputUseActiveIngredient,
          isOpenDeleteInputUseActiveIngredientContainer,
          isOpenNewInputUseActiveIngredientForm,
          isOpenEditInputUseActiveIngredientForm,
          filters,
          handleChangeFilters,
          openNewInputUseActiveIngredientForm,
        }) => (
          <section className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2">
              <Button
                type="button"
                variant="default"
                className="self-end"
                onClick={openNewInputUseActiveIngredientForm}
              >
                Adicionar Princípio Ativo
              </Button>

              <Input
                className="w-fit"
                value={filters.name?.value ?? ''}
                onChange={({ target }) => {
                  handleChangeFilters({
                    name: { value: target.value, type: 'LIKE' },
                  })
                }}
                placeholder="Procurar princípio ativo por nome"
              />
            </div>

            <InputUseActiveIngredientDataTable />

            {selectedInputUseActiveIngredient &&
              isOpenDeleteInputUseActiveIngredientContainer && (
                <InputUseActiveIngredientDeleteDialog />
              )}

            {(isOpenNewInputUseActiveIngredientForm ||
              isOpenEditInputUseActiveIngredientForm) && (
              <InputUseActiveIngredientForm
                id={selectedInputUseActiveIngredient?.id}
              />
            )}
          </section>
        )}
      </InputUseActiveIngredientContext.Consumer>
    </InputUseActiveIngredientProvider>
  )
}

InputUseActiveIngredientsScreen.displayName = 'InputUseActiveIngredientsScreen'
