import { Button, DatePicker } from '@/core/presentation/components/ui'

import { AnimalDiseaseDataTable } from '../components/animal-disease-data-table'
import { AnimalDiseaseDeleteDialog } from '../components/animal-disease-delete-dialog'
import {
  AnimalDiseaseContext,
  AnimalDiseaseProvider,
} from '../contexts/animal-disease-context'
import { AnimalDiseaseForm } from '../forms/animal-disease-form'

type AnimalDiseasesScreenProps = {
  animalId: string
}

export function AnimalDiseasesScreen({ animalId }: AnimalDiseasesScreenProps) {
  return (
    <AnimalDiseaseProvider animalId={animalId}>
      <AnimalDiseaseContext.Consumer>
        {({
          filters,
          handleChangeFilters,
          selectedAnimalDisease,
          isOpenDeleteAnimalDiseaseContainer,
          isOpenNewAnimalDiseaseForm,
          isOpenEditAnimalDiseaseForm,
          openNewAnimalDiseaseForm,
        }) => (
          <section className="flex flex-col gap-4 w-full">
            <div className="flex justify-between gap-2">
              <DatePicker
                className="w-fit"
                date={filters.diagnosticDate}
                onSelect={(date) => {
                  handleChangeFilters({ diagnosticDate: date })
                }}
                label="Filtrar por Data do diagnóstico"
              />

              <Button
                type="button"
                variant="default"
                onClick={openNewAnimalDiseaseForm}
              >
                Adicionar Doença do Animal
              </Button>
            </div>

            <AnimalDiseaseDataTable />
            {selectedAnimalDisease && isOpenDeleteAnimalDiseaseContainer && (
              <AnimalDiseaseDeleteDialog />
            )}

            {(isOpenNewAnimalDiseaseForm || isOpenEditAnimalDiseaseForm) && (
              <AnimalDiseaseForm id={selectedAnimalDisease?.id} />
            )}
          </section>
        )}
      </AnimalDiseaseContext.Consumer>
    </AnimalDiseaseProvider>
  )
}
