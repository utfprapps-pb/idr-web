import { Button, DatePicker } from '@/core/presentation/components/ui'

import { AnimalDeathDataTable } from '../components/animal-death-data-table'
import { AnimalDeathDeleteDialog } from '../components/animal-death-delete-dialog'
import {
  AnimalDeathContext,
  AnimalDeathProvider,
} from '../contexts/animal-death-context'
import { AnimalDeathForm } from '../forms/animal-death-form'

type AnimalDeathsScreenProps = {
  readonly animalId: number
}

export function AnimalDeathsScreen({ animalId }: AnimalDeathsScreenProps) {
  return (
    <AnimalDeathProvider animalId={animalId}>
      <AnimalDeathContext.Consumer>
        {({
          filters,
          handleChangeFilters,
          selectedAnimalDeath,
          isOpenDeleteAnimalDeathContainer,
          isOpenNewAnimalDeathForm,
          isOpenEditAnimalDeathForm,
          openNewAnimalDeathForm,
        }) => (
          <section className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2">
              <Button
                type="button"
                variant="default"
                className="self-end"
                onClick={openNewAnimalDeathForm}
              >
                Adicionar Óbito do Animal
              </Button>

              <DatePicker
                className="w-fit"
                date={
                  filters.date?.value instanceof Date
                    ? filters.date.value
                    : undefined
                }
                onSelect={(date) => {
                  if (!date) return
                  handleChangeFilters({
                    date: {
                      value: date,
                      type: 'EQUALS',
                    },
                  })
                }}
                label="Filtrar por data do óbito"
              />
            </div>

            <AnimalDeathDataTable />
            {selectedAnimalDeath && isOpenDeleteAnimalDeathContainer && (
              <AnimalDeathDeleteDialog />
            )}

            {(isOpenNewAnimalDeathForm || isOpenEditAnimalDeathForm) && (
              <AnimalDeathForm id={selectedAnimalDeath?.id} />
            )}
          </section>
        )}
      </AnimalDeathContext.Consumer>
    </AnimalDeathProvider>
  )
}

AnimalDeathsScreen.displayName = 'AnimalDeathsScreen'
