import { Button, DatePicker } from '@/core/presentation/components/ui'

import { AnimalMastitisDataTable } from '../components/animal-mastitis-data-table'
import { AnimalMastitisDeleteDialog } from '../components/animal-mastitis-delete-dialog'
import {
  AnimalMastitisContext,
  AnimalMastitisProvider,
} from '../contexts/animal-mastitis-context'
import { AnimalMastitisForm } from '../forms/animal-mastitis-form'

type AnimalMastitidesScreenProps = {
  readonly animalId: number
}

export function AnimalMastitidesScreen({
  animalId,
}: AnimalMastitidesScreenProps) {
  return (
    <AnimalMastitisProvider animalId={animalId}>
      <AnimalMastitisContext.Consumer>
        {({
          filters,
          handleChangeFilters,
          selectedAnimalMastitis,
          isOpenDeleteAnimalMastitisContainer,
          isOpenNewAnimalMastitisForm,
          isOpenEditAnimalMastitisForm,
          openNewAnimalMastitisForm,
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
                label="Filtrar por data de mastite"
              />

              <Button
                type="button"
                variant="default"
                onClick={openNewAnimalMastitisForm}
              >
                Adicionar Mastite do Animal
              </Button>
            </div>

            <AnimalMastitisDataTable />
            {selectedAnimalMastitis && isOpenDeleteAnimalMastitisContainer && (
              <AnimalMastitisDeleteDialog />
            )}

            {(isOpenNewAnimalMastitisForm || isOpenEditAnimalMastitisForm) && (
              <AnimalMastitisForm id={selectedAnimalMastitis?.id} />
            )}
          </section>
        )}
      </AnimalMastitisContext.Consumer>
    </AnimalMastitisProvider>
  )
}

AnimalMastitidesScreen.displayName = 'AnimalMastitidesScreen'
