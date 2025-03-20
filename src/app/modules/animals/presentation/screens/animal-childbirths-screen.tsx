import { Button, Input } from '@/core/presentation/components/ui'

import { AnimalChildbirthDataTable } from '../components/animal-childbirth-data-table'
import { AnimalChildbirthDeleteDialog } from '../components/animal-childbirth-delete-dialog'
import {
  AnimalChildbirthContext,
  AnimalChildbirthProvider,
} from '../contexts/animal-childbirth-context'
import { AnimalChildbirthForm } from '../forms/animal-childbirth-form'

type AnimalChildbirthsScreenProps = {
  animalId: string
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
            <div className="flex justify-between gap-2">
              <Input
                className="w-fit"
                value={filters.breed}
                onChange={({ target }) => {
                  handleChangeFilters({ breed: target.value })
                }}
                placeholder="Procurar animal por raça"
              />

              <Button
                type="button"
                variant="default"
                onClick={openNewAnimalChildbirthForm}
              >
                Adicionar Parto do Animal
              </Button>
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
