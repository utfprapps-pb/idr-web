import { Button, Input } from '@/presentation/components/ui'

import { AnimalDeleteDialog, AnimalsDataTable, AnimalForm } from './components'
import { AnimalContext, AnimalProvider } from './contexts/animalContext'

export const AnimalTab: React.FC = () => {
  return (
    <AnimalProvider>
      <AnimalContext.Consumer>
        {({
          selectedAnimal,
          isOpenDeleteAnimalContainer,
          isOpenNewAnimalForm,
          isOpenEditAnimalForm,
          filters,
          handleChangeFilters,
          openNewAnimalForm,
        }) => (
          <section className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-2">
              <Button
                type="button"
                variant="default"
                className="self-end"
                onClick={openNewAnimalForm}
              >
                Adicionar Animal
              </Button>

              <Input
                className="w-fit"
                value={filters.name}
                onChange={({ target }) => {
                  handleChangeFilters({ name: target.value })
                }}
                placeholder="Procurar animal"
              />
            </div>

            <AnimalsDataTable />
            {selectedAnimal && isOpenDeleteAnimalContainer && (
              <AnimalDeleteDialog />
            )}

            {(isOpenNewAnimalForm || isOpenEditAnimalForm) && (
              <AnimalForm id={selectedAnimal?.id} />
            )}
          </section>
        )}
      </AnimalContext.Consumer>
    </AnimalProvider>
  )
}
