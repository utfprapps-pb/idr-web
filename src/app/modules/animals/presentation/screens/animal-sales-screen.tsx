import { Button, DatePicker } from '@/core/presentation/components/ui'

import { AnimalSaleDataTable } from '../components/animal-sale-data-table'
import { AnimalSaleDeleteDialog } from '../components/animal-sale-delete-dialog'
import {
  AnimalSaleContext,
  AnimalSaleProvider,
} from '../contexts/animal-sale-context'
import { AnimalSaleForm } from '../forms/animal-sale-form'

type AnimalSalesScreenProps = {
  readonly animalId: number
}

export function AnimalSalesScreen({ animalId }: AnimalSalesScreenProps) {
  return (
    <AnimalSaleProvider animalId={animalId}>
      <AnimalSaleContext.Consumer>
        {({
          filters,
          handleChangeFilters,
          selectedAnimalSale,
          isOpenDeleteAnimalSaleContainer,
          isOpenNewAnimalSaleForm,
          isOpenEditAnimalSaleForm,
          openNewAnimalSaleForm,
        }) => (
          <section className="flex flex-col gap-4 w-full">
            <div className="flex justify-between gap-2">
              <DatePicker
                className="w-fit"
                date={filters.date?.value}
                onSelect={(date) => {
                  if (!date) return
                  handleChangeFilters({
                    date: {
                      value: date,
                      type: 'EQUALS',
                    },
                  })
                }}
                label="Filtrar por data de venda"
              />

              <Button
                type="button"
                variant="default"
                onClick={openNewAnimalSaleForm}
              >
                Adicionar Venda do Animal
              </Button>
            </div>

            <AnimalSaleDataTable />
            {selectedAnimalSale && isOpenDeleteAnimalSaleContainer && (
              <AnimalSaleDeleteDialog />
            )}

            {(isOpenNewAnimalSaleForm || isOpenEditAnimalSaleForm) && (
              <AnimalSaleForm id={selectedAnimalSale?.id} />
            )}
          </section>
        )}
      </AnimalSaleContext.Consumer>
    </AnimalSaleProvider>
  )
}

AnimalSalesScreen.displayName = 'AnimalSalesScreen'
