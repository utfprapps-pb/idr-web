import { Button, Input } from '@/core/presentation/components/ui'

import { AnimalChildbirthDataTable } from '../components/animal-childbirth-data-table'
import { AnimalChildbirthDeleteDialog } from '../components/animal-childbirth-delete-dialog'
import {
  AnimalChildbirthContext,
  AnimalChildbirthProvider,
} from '../contexts/animal-childbirth-context'
import { AnimalChildbirthForm } from '../forms/animal-childbirth-form'

type AnimalChildbirthsScreenProps = {
  readonly animalId: number
}

export function AnimalChildbirthsScreen({
  animalId,
}: AnimalChildbirthsScreenProps) {
  return (
    <AnimalChildbirthProvider animalId={animalId}>
      <AnimalChildbirthContext.Consumer>
        {({
          filters,
          handleChangeFilters,
          selectedAnimalChildbirth,
          isOpenDeleteAnimalChildbirthContainer,
          isOpenNewAnimalChildbirthForm,
          isOpenEditAnimalChildbirthForm,
          openNewAnimalChildbirthForm,
        }) => (
          <section className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2">
              <Button
                type="button"
                variant="default"
                className="self-end"
                onClick={openNewAnimalChildbirthForm}
              >
                Adicionar Parto do Animal
              </Button>

              <Input
                className="w-fit"
                value={filters.breed?.value}
                onChange={({ target }) => {
                  handleChangeFilters({
                    breed: {
                      value: target.value,
                      type: 'LIKE',
                    },
                  })
                }}
                placeholder="Procurar animal por raça"
              />
            </div>

            <AnimalChildbirthDataTable />
            {selectedAnimalChildbirth &&
              isOpenDeleteAnimalChildbirthContainer && (
                <AnimalChildbirthDeleteDialog />
              )}

            {(isOpenNewAnimalChildbirthForm ||
              isOpenEditAnimalChildbirthForm) && (
              <AnimalChildbirthForm id={selectedAnimalChildbirth?.id} />
            )}
          </section>
        )}
      </AnimalChildbirthContext.Consumer>
    </AnimalChildbirthProvider>
  )
}

AnimalChildbirthsScreen.displayName = 'AnimalChildbirthsScreen'
