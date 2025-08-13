import { Button, DatePicker } from '@/core/presentation/components/ui'

import { AnimalPregnancyDiagnosisDataTable } from '../components/animal-pregnancy-diagnosis-data-table'
import { AnimalPregnancyDiagnosisDeleteDialog } from '../components/animal-pregnancy-diagnosis-delete-dialog'
import {
  AnimalPregnancyDiagnosisProvider,
  AnimalPregnancyDiagnosisContext,
} from '../contexts/animal-pregnancy-diagnosis-context'
import { AnimalPregnancyDiagnosisForm } from '../forms/animal-pregnancy-diagnosis-form'

type AnimalPregnancyDiagnosesScreenProps = {
  readonly animalId: number
}

export function AnimalPregnancyDiagnosesScreen({
  animalId,
}: AnimalPregnancyDiagnosesScreenProps) {
  return (
    <AnimalPregnancyDiagnosisProvider animalId={animalId}>
      <AnimalPregnancyDiagnosisContext.Consumer>
        {({
          filters,
          handleChangeFilters,
          selectedAnimalPregnancyDiagnosis,
          isOpenDeleteAnimalPregnancyDiagnosisContainer,
          isOpenNewAnimalPregnancyDiagnosisForm,
          isOpenEditAnimalPregnancyDiagnosisForm,
          openNewAnimalPregnancyDiagnosisForm,
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
                      type: 'LIKE',
                    },
                  })
                }}
                label="Filtrar por Data do diagnóstico"
              />

              <Button
                type="button"
                variant="default"
                onClick={openNewAnimalPregnancyDiagnosisForm}
              >
                Adicionar Diagnóstico de Gestação
              </Button>
            </div>

            <AnimalPregnancyDiagnosisDataTable />
            {selectedAnimalPregnancyDiagnosis &&
              isOpenDeleteAnimalPregnancyDiagnosisContainer && (
                <AnimalPregnancyDiagnosisDeleteDialog />
              )}

            {(isOpenNewAnimalPregnancyDiagnosisForm ||
              isOpenEditAnimalPregnancyDiagnosisForm) && (
              <AnimalPregnancyDiagnosisForm
                id={selectedAnimalPregnancyDiagnosis?.id}
              />
            )}
          </section>
        )}
      </AnimalPregnancyDiagnosisContext.Consumer>
    </AnimalPregnancyDiagnosisProvider>
  )
}
